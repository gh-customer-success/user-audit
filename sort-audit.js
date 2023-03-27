
   export const  getTeams = async (response)=>{
        //get the data from the response
        const data = response;
        //create an object with the teams  their members and repositories
        const teams = {};
        const teamPermissions = {};
        //iterate through the teams
        data.organization.teams.edges.forEach((team) => {
            //get the team name
            const teamName = team.node.name;

            //get the team members
            teamPermissions.members = team.node.members.edges.map((member) => member.node.login);
            //get the team repositories
            teamPermissions.repositories = team.node.repositories.edges.map((repository) => repository.node.name);

            //add the team name and members to the teams object
            teams[teamName] = teamPermissions;
        });
        return teams;
    }
    //   import { createRequire } from 'node:module';
    //   const require = createRequire(import.meta.url);

    //   const response = require('./response.json');

    //a function that gets all the repositores and returns their collaborators and their permissions
    export const getRepos = async (response)=> {
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

export default {getTeams, getRepos};

