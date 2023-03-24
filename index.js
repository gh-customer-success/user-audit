const core = require('@actions/core');
const wait = require('./wait');
const { graphql } = require('@octokit/graphql');
const query = require('./audit.gql');

// most @actions toolkit packages have async methods
async function run() {
  //take the required inputs repo and owner and execute the graphql query audit.gql
  const repo = core.getInput('repo');
  const owner = core.getInput('owner');
  const token = core.getInput('token');
  const octokit = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });
  const { repository } = await octokit(query, {
    owner,
    repo,
  });
  //log the response
  console.log(repository);
  //set the output
  core.setOutput('response', JSON.stringify(repository));
  
}

run();
