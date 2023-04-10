import { graphql } from '@octokit/graphql';

// Function to retrieve all the repositories and their collaborators in an organization
export default async function getAllData(owner, token) {
  // Create a GraphQL client with the provided token
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });

  let repositories = [];
  let repositoriesCursor = null;

  // Paginate through the repositories and their collaborators
  do {
    // Query the organization's repositories with pagination
    const repositoriesQuery = await graphqlWithAuth({
      query: `
        query ($owner: String!, $cursor: String) {
          organization(login: $owner) {
            repositories(first: 100 after: $cursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  name
                  collaborators(first: 100) {
                    pageInfo {
                      hasNextPage
                      endCursor
                    }
                    edges {
                      permission
                      node {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      owner,
      cursor: repositoriesCursor,
    });

    // Extract the repositories and their collaborators from the query result
    const { repositories: repoData } = repositoriesQuery.organization;

    // Map over the repositories and their collaborators to extract the relevant data
    const repositoriesWithCollaborators = repoData.edges.map((edge) => {
      const { name, collaborators } = edge.node;
      const collabPermissions = [];

      // Recursively retrieve all the collaborators for a repository with pagination
      async function getCollaborators(cursor) {
        const collaboratorsQuery = await graphqlWithAuth({
          query: `
            query ($owner: String!, $repo: String!, $cursor: String) {
              repository(owner: $owner, name: $repo) {
                collaborators(first: 100 after: $cursor) {
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  edges {
                    permission
                    node {
                      login
                    }
                  }
                }
              }
            }
          `,
          owner,
          repo: name,
          cursor,
        });

        const { collaborators: collabData } = collaboratorsQuery.repository;

        // Extract the collaborators and their permissions from the query result
        collabData.edges.forEach((collab) => {
          const { permission, node } = collab;
          collabPermissions.push({ login: node.login, permission });
        });

        // Recursively retrieve the next page of collaborators if there are more
        if (collabData.pageInfo.hasNextPage) {
          await getCollaborators(collabData.pageInfo.endCursor);
        }
      }

      // Extract the collaborators and their permissions from the query result
      collaborators.edges.forEach((collab) => {
        const { permission, node } = collab;
        collabPermissions.push({ login: node.login, permission });
      });

      // Recursively retrieve the next page of collaborators if there are more
      if (collaborators.pageInfo.hasNextPage) {
         getCollaborators(collaborators.pageInfo.endCursor);
      }

      // Return an object with the repository name and its collaborators and permissions
      return { name, collaborators: collabPermissions };
    });

    // Concatenate the repositories and their collaborators to the overall list
    repositories = repositories.concat(repositoriesWithCollaborators);

    // Update the cursor for the next page of repositories
    repositoriesCursor = repoData.pageInfo.endCursor;
  } while (repositoriesCursor !== null);

  // Return an object with the list of repositories and their collaborators and permissions
  return { repositories };
}