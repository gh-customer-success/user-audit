import fs from 'fs';
// Require the csv module
import { stringify } from 'csv';
import { getTeams } from './sort-audit.js';
import core from '@actions/core';
import { Artifact } from '@actions/artifact';

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
    try {

        // Create the artifact
        const artifact = new Artifact('my-artifact');
        artifact.addBuffer(Buffer.from(csv), 'teams-audit.csv');
        await artifact.upload();

        // Set the output for the calling workflow
        core.setOutput('artifact-url', artifact.url);
    } catch (error) {
        core.setFailed(error.message);
    }
};

export default { teamsCSV };