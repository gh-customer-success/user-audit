
import * as core from '@actions/core'

export const generateOutputString = async (permissions) => {

  //append the key of each obect and its value to the output string
  const permissionArray = [['Permission', 'Total']];
  //append the key of each object and its value to the output array
  for (var permission in permissions) {
    permissionArray.push([permission, permissions[permission]]);
  }

  await core.summary
    .addHeading('Test Results')
    .addCodeBlock(generateTestResults(), "js")
    .addTable([
      [{ data: 'Permission', header: true }, { data: 'Total', header: true }],
      permissionArray
    ])
    .write()



}

//a function that takes a parameter of teams and generates a count for each permission, generate the permission type from the data that is passed in
export const generatePermissionsCount = (data) => {
  // create a Set to hold the unique permission types
  const permissionTypes = new Set();

  // iterate through the repositories
  data.forEach((repo) => {
    // iterate through the collaborators
    repo.collaborators.forEach((collaborator) => {
      // add the permission type to the Set
      permissionTypes.add(collaborator.permission);
    });
  });

  // convert the Set to an array and sort it alphabetically
  const uniquePermissions = Array.from(permissionTypes).sort();

  // create an object to hold the counts
  const permissionsCount = {};
  uniquePermissions.forEach((permission) => {
    permissionsCount[permission] = 0;
  });

  // iterate through the repositories again
  data.forEach((repo) => {
    // iterate through the collaborators
    repo.collaborators.forEach((collaborator) => {
      // add to the count for the permission
      permissionsCount[collaborator.permission] += 1;
    });
  });

  console.log("Permission: " + generateOutputString(permissionsCount));
  return permissionsCount;
}
export default { generatePermissionsCount, generateOutputString };


