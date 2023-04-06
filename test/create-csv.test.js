import { teamsCSV } from '../create-csv';
import { jest } from '@jest/globals';
import fs from 'fs';

describe('teamsCSV', () => {
  it('should create a CSV file with the correct data', () => {
    const teams = [
      { team: 'team1', user: 'user1', repo: 'repo1', permission: 'read' },
      { team: 'team2', user: 'user2', repo: 'repo2', permission: 'write' },
    ];

    // Mock the fs.writeFile method
    jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
      expect(path).toBe('teams-audit.csv');
      expect(data).toContain('team,user,repo,permission');
      expect(data).toContain('team1,user1,repo1,read');
      expect(data).toContain('team2,user2,repo2,write');
      callback();
    });

    // Mock the fs.readdir method
    jest.spyOn(fs, 'readdir').mockImplementation((path, callback) => {
      expect(path).toBe('.');
      callback(null, ['teams-audit.csv']);
    });

    // Define the uploadCSV property in the global object
    global.uploadCSV = jest.fn();

    // Call the teamsCSV function
    teamsCSV(teams);

    // Verify that the mock methods were called
    expect(fs.writeFile).toHaveBeenCalled();
    expect(fs.readdir).toHaveBeenCalled();
    expect(global.uploadCSV).toHaveBeenCalled();
  });
});