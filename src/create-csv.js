
// Import the fs module for working with the file system
import fs from 'fs';
// Require the csv module
import { stringify } from 'csv-stringify';
// Import the core and artifact modules from the GitHub Actions toolkit
import * as core from '@actions/core';
import * as artifact from '@actions/artifact';

// Export the teamsCSV function
export const teamsCSV = (teams) => {
    // Convert the teams array to a CSV string using the csv-stringify library
    stringify(teams, {
        header: true,
        columns: ['team', 'user', 'repo', 'permission']
    }, function (err, output) {
        // console.log(output);
        // Write the CSV string to a file called teams-audit.csv
        fs.writeFile('teams-audit.csv', output, (err) => {
            if (err) throw err;
            // console.log('File written successfully!');
            // Log the files in the current directory to the console
            fs.readdir('.', (err, files) => {
                if (err) throw err;
            });
            // Call the uploadCSV function to upload the CSV file as an artifact
            uploadCSV('teams-audit');
        });
    });

};

export const repoCSV = (repos) => {
    //convert the repos object to a CSV string using the csv-stringify library
    stringify(repos, {
        header: true,
        columns: ['repo', 'user', 'permission']
    }, function (err, output) {
        // console.log(output);
        // Write the CSV string to a file called teams-audit.csv
        fs.writeFile('repo-audit.csv', output, (err) => {
            if (err) throw err;
            // console.log('File written successfully!');
            // Log the files in the current directory to the console
            fs.readdir('.', (err, files) => {
                if (err) throw err;
            });
            // Call the uploadCSV function to upload the CSV file as an artifact
            uploadCSV('repo-audit');
        });
    });
}
// Define the uploadCSV function
export const uploadCSV = async (file) => {
    try {
        // Create an artifact client using the artifact.create() method
        const artifactClient = artifact.create();

        // Upload the file contents as an artifact using the artifactClient.uploadArtifact() method
        await artifactClient.uploadArtifact(
            file,
            [file + '.csv'],
            '.'
        );

        console.log('Artifact uploaded successfully!');
    } catch (error) {
        // Set the workflow status to failed if an error occurs
        core.setFailed(error.message);
    }
};

export default { teamsCSV, repoCSV, uploadCSV };