import core from '@actions/core';
import { graphql } from '@octokit/graphql';
import * as fs from 'fs';
import path from 'path';
const query = fs.readFileSync(path.join(__dirname, './audit.gql'), 'utf8');
import { getTeams, getRepos } from './sort-audit.js';
import { teamsCSV, repoCSV } from './create-csv.js';
import { getAllData } from './get-repository-collaborators.js';
import { generatePermissionsCount } from './step-summary-table.js';
// most @actions toolkit packages have async methods
async function run() {
  try {
    //take the required inputs repo and owner and execute the graphql query audit.gql
    const repo = core.getInput('repo');
    const owner = core.getInput('owner');
    const token = core.getInput('api_token');



    //call the getTeams function and pass in data
    // const teams = getTeams(data); 
    //call the getRepos function and pass in data 

    getAllData(owner, token).then(({ repositories }) => {
      console.log(JSON.stringify(repositories) + "\n");


      //create the csv and upload it as an artifact
      // teamsCSV(teams);
      const repos = getRepos(repositories);
      repoCSV(repos);
      // core.setOutput('teams', JSON.stringify(teams))
      core.setOutput('repos', JSON.stringify(repositories));
      //run an echo command to pipe the output of generateOutputString to $GITHUB_STEP_SUMMARY
      generatePermissionsCount(repositories);
      
    }).catch((error) => {
      console.error(error);
      core.setFailed(error.message);
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();