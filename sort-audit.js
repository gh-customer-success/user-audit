export const getTeams = (data) => {
  const teamObjects = [];

  data.organization.teams.nodes.forEach((team) => {
    const members = team.members.edges.map((member) => member.node.login);
    const repos = team.repositories.edges.map((repository) => {
      return { repo: repository.node.name, permission: repository.permission };
    });

    members.forEach((member) => {
      repos.forEach((repo) => {
        const teamObject = { team: team.name, user: member, repo: repo.repo, permission: repo.permission };

        if (!teamObjects.some((obj) => obj.team === teamObject.team && obj.user === teamObject.user && obj.repo === teamObject.repo && obj.permission === teamObject.permission)) {
          teamObjects.push(teamObject);
        }
      });
    });
  });

  return teamObjects;
};

export const getRepos = (data) => {  
  console.log(JSON.stringify(data))
  const repoObjects = [];
  data.forEach((repo) => {
    const repoName = repo.name;

    repo.collaborators.forEach((collaborator) => {
      const collaboratorName = collaborator.login;
      const collaboratorPermissions = collaborator.permission;

      const repoObject = {
        repo: repoName,
        user: collaboratorName,
        permission: collaboratorPermissions
      };

      repoObjects.push(repoObject);
    });
  });
  return repoObjects;
};

// const data = '[{"name":"repo-secure","collaborators":[{"login":"userA","permission":"ADMIN"},{"login":"userB","permission":"READ"}]},{"name":"repo-secure-example","collaborators":[{"login":"userA","permission":"ADMIN"},{"login":"userB","permission":"READ"}]},{"name":"Private-Repo","collaborators":[{"login":"userA","permission":"ADMIN"},{"login":"userB","permission":"READ"}]},{"name":"WebGoat","collaborators":[{"login":"userA","permission":"ADMIN"},{"login":"userB","permission":"READ"}]},{"name":"AVerySecureRepo","collaborators":[{"login":"userA","permission":"ADMIN"},{"login":"userB","permission":"READ"}]},{"name":"my-secure-repo","collaborators":[{"login":"userA","permission":"ADMIN"},{"login":"userB","permission":"ADMIN"}]}]';
// console.log(JSON.stringify(getRepos(data)))
export default { getTeams, getRepos };