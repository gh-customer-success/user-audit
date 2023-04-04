
export const getTeams = (data) => { 
  // This function takes in an object called 'data' that contains information about teams, members, and repositories.

  const teamObjects = [];
  // This creates an empty array called 'teamObjects' that will be used to store the new objects that are created.
   
  data.organization.teams.nodes.forEach((team) => {
    // This loops through each team object in the 'nodes' array of the 'teams' property.

    const members = team.members.edges.map((member) => member.node.login);
    const repos = team.repositories.edges.map((repository) => {
        return {repo: repository.node.name, permission: repository.permission};
    });
    // These create arrays of member logins and repository names for each team.

    members.forEach((member) => {
      repos.forEach((repo) => {
        const teamObject = { team: team.name, user: member, repo: repo.repo, permission: repo.permission };
        // This creates a new object called 'teamObject' that contains the team name, member login, and repository name.

        if (!teamObjects.some((obj) => obj.team === teamObject.team && obj.user === teamObject.user && obj.repo === teamObject.repo && obj.permission === teamObject.permission)) {
          teamObjects.push(teamObject);
        }
        // This checks if the 'teamObjects' array already contains an object with the same team, member, and repository. If not, it adds the 'teamObject' to the array.
      });
    });
  });

  return teamObjects;
  // This returns the 'teamObjects' array, which should contain an array of objects that represent each combination of team, member, and repository.
}


//a function that gets all the repositores and returns their collaborators and their permissions
export const getRepos = (response) => {
    //get the data from the response
    const data = response;

    //create an object with the repositories and their collaborators
    const repos = {};
    //iterate through the repositories
    data.organization.repositories.edges.forEach((repo) => {
        //get the repository name
        const repoName = repo.node.name;
        //create an object with the collaborators and their permissions
        const repoCollaborators = {};
        //iterate through the collaborators
        repo.node.collaborators.edges.forEach((collaborator) => {
            //get the collaborator name
            const collaboratorName = collaborator.node.login;
            //get the collaborator permissions
            const collaboratorPermissions = collaborator.permission;
            //add the collaborator name and permissions to the collaborators object
            repoCollaborators[collaboratorName] = collaboratorPermissions;
        });

        repos[repoName] = repoCollaborators;
    }
    );

    return repos;
}
// import { log } from 'node:console';
// import fs from 'fs';
// let response;
//  fs.readFile('./response.json', 'utf8', (err, data) => {
//   if (err) throw err; 
   
//   response = JSON.parse(data);
// console.log(JSON.stringify(getTeams(response)));
// });



export default { getTeams, getRepos };

