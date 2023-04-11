import { getRepos } from '../src/sort-audit.js';
import response from '../response.json';

// describe('getTeams', () => {
//   test('returns an array of team objects', async () => {
//     const expected = [
//       { team: 'avocado security', user: 'userA', repo: 'repo-secure', permission: 'READ' },
//       { team: 'avocado security', user: 'userA', repo: 'repo-secure-example', permission: 'READ' },
//       { team: 'avocado security', user: 'userA', repo: 'Private-Repo', permission: 'READ' },
//       { team: 'avocado security', user: 'userA', repo: 'WebGoat', permission: 'READ' },
//       { team: 'avocado security', user: 'userA', repo: 'AVerySecureRepo', permission: 'READ' },
//       { team: 'avocado security', user: 'userA', repo: 'my-secure-repo', permission: 'READ' },
//       { team: 'avocado security', user: 'userB', repo: 'repo-secure', permission: 'READ' },
//       { team: 'avocado security', user: 'userB', repo: 'repo-secure-example', permission: 'READ' },
//       { team: 'avocado security', user: 'userB', repo: 'Private-Repo', permission: 'READ' },
//       { team: 'avocado security', user: 'userB', repo: 'WebGoat', permission: 'READ' },
//       { team: 'avocado security', user: 'userB', repo: 'AVerySecureRepo', permission: 'READ' },
//       { team: 'avocado security', user: 'userB', repo: 'my-secure-repo', permission: 'READ' },
//       { team: 'some other team', user: 'userA', repo: 'repo-secure', permission: 'WRITE' }
//     ];

//     expect(getTeams(response)).toEqual(expected);
//   });
// });

describe('getRepos', () => {
  test('returns an array of repository objects', () => {
    const expected = [
      { repo: 'repo-secure', user: 'userA', permission: 'ADMIN' },
      { repo: 'repo-secure', user: 'userB', permission: 'READ' },
      { repo: 'repo-secure-example', user: 'userA', permission: 'ADMIN' },
      { repo: 'repo-secure-example', user: 'userB', permission: 'READ' },
      { repo: 'Private-Repo', user: 'userA', permission: 'ADMIN' },
      { repo: 'Private-Repo', user: 'userB', permission: 'READ' },
      { repo: 'WebGoat', user: 'userA', permission: 'ADMIN' },
      { repo: 'WebGoat', user: 'userB', permission: 'READ' },
      { repo: 'AVerySecureRepo', user: 'userA', permission: 'ADMIN' },
      { repo: 'AVerySecureRepo', user: 'userB', permission: 'READ' },
      { repo: 'my-secure-repo', user: 'userA', permission: 'ADMIN' },
      { repo: 'my-secure-repo', user: 'userB', permission: 'ADMIN' }
    ];
    
    expect(getRepos(response.organization.repositories)).toEqual(expected);
  });
});