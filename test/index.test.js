const assert = require('assert');
const parseResponse = require('../sort-audit.js');

describe('parseResponse', () => {
  it('should parse the response and return an object with teams and their members', () => {
    const response = {
      data: {
        organization: {
          teams: {
            edges: [
              {
                node: {
                  name: 'Team A',
                  members: {
                    edges: [
                      {
                        node: {
                          login: 'user1'
                        }
                      },
                      {
                        node: {
                          login: 'user2'
                        }
                      }
                    ]
                  }
                }
              },
              {
                node: {
                  name: 'Team B',
                  members: {
                    edges: [
                      {
                        node: {
                          login: 'user3'
                        }
                      },
                      {
                        node: {
                          login: 'user4'
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    };

    const expectedOutput = {
      'Team A': ['user1', 'user2'],
      'Team B': ['user3', 'user4']
    };

    assert.deepStrictEqual(parseResponse(response), expectedOutput);
  });
});