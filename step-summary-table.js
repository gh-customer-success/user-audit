

function generateTeamsString(teams) {
  let teamsString = `
  | Team | Members |
  | ---- | ------- |
  `;

  teams.forEach((team) => {
    teamsString += `| ${team.name} | | tea`;
    teamsString += ` ${team.members.join(', ')}\n\n`;
  });

  return teamsString;
}

//a function that takes a parameter of teams and generates a count for each permission, generate the permission type from the data that is passed in
export const generatePermissionsCount = (data) => {
  // create a Set to hold the unique permission types
  const permissionTypes = new Set();
// console.log("teams: \n" + JSON.stringify(data.organization))
  // iterate through the teams
  data.organization.teams.nodes.forEach((team) => {
    // iterate through the repositories
    // permissionTypes.add(team.permission);
    team.repositories.edges.forEach((repo) => {
      // iterate through the collaborators
      // repo.collaborators.forEach((collaborator) => {
        // add the permission type to the Set
        permissionTypes.add(repo.permission);
      // });
    });
  });

  // convert the Set to an array and sort it alphabetically
  const uniquePermissions = Array.from(permissionTypes).sort();

  // create an object to hold the counts
  const permissionsCount = {};
  uniquePermissions.forEach((permission) => {
    permissionsCount[permission] = 0;
  });

  // iterate through the teams again
  data.organization.repositories.edges.forEach((repo) => {
    // iterate through the repositories
    // team.repositories.forEach((repo) => {
    //   // iterate through the collaborators
      repo.node.collaborators.edges.forEach((collaborator) => {
        // add to the count for the permission
        permissionsCount[collaborator.permission] += 1;
      });
    // });
  });
  console.log("Permission: " + JSON.stringify(permissionsCount))
  return permissionsCount;
}
export default  {generatePermissionsCount};

import fs from 'fs';
import { getTeams } from './sort-audit.js';
// function testIt(){
let response;
 fs.readFile('./response.json', 'utf8', (err, data) => {
  if (err) throw err; 
   
  response = JSON.parse(data);
 const teams =  getTeams(response);
  console.log(JSON.stringify(generatePermissionsCount(response)));
});
// }