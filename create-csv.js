import fs from 'fs';
// Require the csv module
import { stringify } from 'csv-stringify';
import * as core from '@actions/core';
import * as artifact from '@actions/artifact';

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
        fs.writeFile('teams-audit.csv', output, (err) => {
            if (err) throw err;
            console.log('File written successfully!');
            fs.readdir('.', (err, files) => {
                if (err) throw err;
                console.log(files);
              });
            uploadCSV(output);
        });
    })

};


const uploadCSV = async (csv) => {
    try {
        const artifactClient = artifact.create();
        // const csv =  fs.readFile('data/teams.csv', 'utf8');

        // // Create the artifact
        // const response = await artifactClient.createArtifact({
        //   name: 'teams-audit.csv',
        //   size: Buffer.byteLength(csv),
        //   contentType: 'text/plain'
        // });

        // Upload the file contents
        await artifactClient.uploadArtifact(
            'teams-audit',
            ['teams-audit.csv'],
            '.'
        );

        console.log('Artifact uploaded successfully!');
    } catch (error) {
        core.setFailed(error.message);
    }
};

export default { teamsCSV };