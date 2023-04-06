import { teamsCSV } from '../create-csv';

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

    // Mock the uploadCSV method
    jest.spyOn(global, 'uploadCSV').mockImplementation((file) => {
      expect(file).toBe('teams-audit');
    });

    // Call the teamsCSV function
    teamsCSV(teams);

    // Verify that the mock methods were called
    expect(fs.writeFile).toHaveBeenCalled();
    expect(fs.readdir).toHaveBeenCalled();
    expect(global.uploadCSV).toHaveBeenCalled();
  });
});