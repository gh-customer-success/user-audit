import fs from 'fs';
// Require the csv module
import { stringify } from 'csv-stringify';
import core from '@actions/core'; 
import github from '@actions/github';

// let response;
// fs.readFile('./response.json', 'utf8', (err, data) => {
//     // console.log(data);
//     if (err) throw err;

//     response = JSON.parse(data);
//     const teams = getTeams(response);
// console.log(JSON.stringify(getTeams(response)));

export const teamsCSV = (teams) => {
    stringify(teams, {
        header: true,
        columns: ['team', 'user', 'repo', 'permission']
    }, function (err, output) {
        console.log(output);
        uploadCSV(teams);
    })
    
};


const uploadCSV = async (csv) => {
//// Create a new artifact client
const artifactClient = github.getOctokit(core.getInput('github-token')).actions;

// Upload the file as an artifact
const uploadResponse = await artifactClient.createArtifact({
  owner: github.context.repo.owner,
  repo: github.context.repo.repo,
  name: 'teams-audit.csv',
  size: Buffer.byteLength(csv),
  headers: {
    'content-type': 'text/plain'
  }
});

// Upload the file contents
await artifactClient.uploadArtifact({
  owner: github.context.repo.owner,
  repo: github.context.repo.repo,
  artifact_id: uploadResponse.data.id,
  file: 'data/teams.csv',
  content_type: 'text/plain'
});
};

export default { teamsCSV };