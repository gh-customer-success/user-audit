import core from '@actions/core';
import { graphql } from '@octokit/graphql';
import * as fs from 'fs';
import path from 'path';
const query = fs.readFileSync(path.join(__dirname, './audit.gql'), 'utf8');
import { getTeams, getRepos } from './sort-audit.js';
import { teamsCSV, repoCSV } from './create-csv.js';
// most @actions toolkit packages have async methods
async function run() {
  try {
    //take the required inputs repo and owner and execute the graphql query audit.gql
    const repo = core.getInput('repo');
    const owner = core.getInput('owner');
    const token = core.getInput('api_token'); 

    const octokit = graphql.defaults({
      headers: {
        authorization: `token ${token} `,
      },
    }); 
    console.log(`query: ${query}`);
    const data = await octokit(query, {
      owner,
      repo,
      affiliation: 'ALL',
    });
 
    //call the getTeams function and pass in data
    const teams = getTeams(data); 
    //call the getRepos function and pass in data
    const repos = getRepos(data);

    //create the csv and upload it as an artifact
    teamsCSV(teams);
    repoCSV(repos); 
    core.setOutput('teams', JSON.stringify(teams))
    core.setOutput('repos', JSON.stringify(repos));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();