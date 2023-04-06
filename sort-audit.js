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

export const getRepos = (response) => {
  const data = response;
  const repoObjects = [];

  data.organization.repositories.edges.forEach((repo) => {
    const repoName = repo.node.name;

    repo.node.collaborators.edges.forEach((collaborator) => {
      const collaboratorName = collaborator.node.login;
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

export default { getTeams, getRepos };