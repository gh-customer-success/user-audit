

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
export const generatePermissionsCount = (teams) => {
  // create a Set to hold the unique permission types
  const permissionTypes = new Set();

  // iterate through the teams
  teams.forEach((team) => {
    // iterate through the repositories
    permissionTypes.add(team.permission);
    // team.repositories.forEach((repo) => {
    //   // iterate through the collaborators
    //   repo.collaborators.forEach((collaborator) => {
    //     // add the permission type to the Set
    //     permissionTypes.add(collaborator.permission);
    //   });
    // });
  });

  // convert the Set to an array and sort it alphabetically
  const uniquePermissions = Array.from(permissionTypes).sort();

  // create an object to hold the counts
  const permissionsCount = {};
  uniquePermissions.forEach((permission) => {
    permissionsCount[permission] = 0;
  });

  // iterate through the teams again
  teams.forEach((team) => {
    // iterate through the repositories
    team.repositories.forEach((repo) => {
      // iterate through the collaborators
      repo.collaborators.forEach((collaborator) => {
        // add to the count for the permission
        permissionsCount[collaborator.permission] += 1;
      });
    });
  });
  console.log("Permission: " + JSON.stringify(permissionsCount))
  return permissionsCount;
}
export default  {generatePermissionsCount};