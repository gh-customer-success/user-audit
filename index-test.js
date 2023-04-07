import core from '@actions/core';
import { graphql } from '@octokit/graphql';
import * as fs from 'fs';
import path from 'path';
// const query = fs.readFileSync(path.join(__dirname, './audit.gql'), 'utf8');
import { getTeams, getRepos } from './sort-audit.js';
import { teamsCSV, repoCSV } from './create-csv.js';
// most @actions toolkit packages have async methods
 const query = `
 query ($owner: String!, $affiliation: CollaboratorAffiliation!, $endCursor: String) { 
  organization(login: $owner) {
    teams(first:1 after:$endCursor){
      nodes{
        name
        updatedAt
        repositories(first:1 after:$endCursor) {
          pageInfo{
            hasNextPage
            endCursor
          }
          edges {
            permission
            node {
              name
              collaborators(first:1 affiliation:$affiliation after: $endCursor){
                edges{
                  node{
                    isEmployee
                    login
                    name
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        }
        members{
          edges{
            node{
              login
              name
              
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    repositories(first:1 after:$endCursor){
      edges{
        node{
          name
          collaborators(first:1 affiliation:$affiliation after: $endCursor){
            edges{
              node{
                isEmployee
                login
                name
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
 `
async function run(endCursor, dataAccumulator = []) {
  try {
    const owner = 'avocado-corporation';
    const token = ''; 
    const affiliation = 'ALL';

    const octokit = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });

    const data = await octokit(query, {
      owner,
      affiliation,
      endCursor,
    });

    dataAccumulator.push(data);

    if (data.organization.teams.pageInfo.hasNextPage) {
      await run(data.organization.teams.pageInfo.endCursor, dataAccumulator);
    } else if (data.organization.repositories.pageInfo.hasNextPage) {
      await run(data.organization.repositories.pageInfo.endCursor, dataAccumulator);
    } else {
      // All records have been fetched
      const combinedData = Object.assign({}, ...dataAccumulator);
      // Process the combined data here
      console.log(JSON.stringify(combinedData))
    }
    
  } catch (error) {
    console.error(error);
  }
}

run();