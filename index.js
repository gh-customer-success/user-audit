const core = require('@actions/core');
const { graphql } = require('@octokit/graphql');
const { gql } = require('graphql-tag');
const fs = require('fs');
const path = require('path');
const query = gql(fs.readFileSync(path.join(__dirname, './audit.gql'), 'utf8'));

// most @actions toolkit packages have async methods
async function run() {
  try {
    //take the required inputs repo and owner and execute the graphql query audit.gql
  const repo = core.getInput('repo');
  const owner = core.getInput('owner');
  const token = core.getInput('api_token');
  console.log(`repo: ${repo}, owner: , token: `);
  const octokit = graphql.defaults({
    headers: {
      authorization: `token ${token} `,
    },
  });
  console.log(`octokit: `);
  const { repository } = await octokit(query, {
    owner,
    repo,
  });
//   console.log(`repository: `);
//   //log the response
//   console.log(repository);
//   //set the output
  core.setOutput('response', JSON.stringify(repository));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();