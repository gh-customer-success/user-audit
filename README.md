# GitHub User Audit 
<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

Uses the GitHub GraphQL API to run audits on users and their permissions to an organization's repositories. 

Generates a summary for all permissions and their count.

<img width="385" alt="image" src="https://user-images.githubusercontent.com/680463/231044211-0fe1f677-8317-4dcd-88b4-73610eae2bd3.png">

An artifact is uploaded as a CSV file. This file can be analysed on most spreadsheet applications, such as Microsoft [Excel](https://www.microsoft.com/en-us/microsoft-365/excel).

<img width="500" alt="image" src="https://user-images.githubusercontent.com/680463/231044626-06976be7-4663-4ec5-8c3d-444f9ea2a9c3.png">

Alternatively CSV files can be persisted in a NoSQL DB.


## Personal Access Token (classic)

An Oganization Admin can [generate](https://github.com/settings/tokens) a token with the following permissions:

<img width="426" alt="image" src="https://user-images.githubusercontent.com/680463/231043291-ce54bfc5-9d47-49b5-80cc-b317602addc7.png">
<img width="628" alt="image" src="https://user-images.githubusercontent.com/680463/231043402-983d914b-d787-456c-891a-70f6f2106180.png">
<img width="472" alt="image" src="https://user-images.githubusercontent.com/680463/231043457-47c8d3cc-6a9c-4f4f-b919-704d815b5316.png">

 ```
 repo
 read:org 
 read:user
 user:email
 ```

## Using the Action

The action requires 2 inputs a variable (Organization Name) and a secret (API Token)

<img width="386" alt="image" src="https://user-images.githubusercontent.com/680463/231046061-b0aca50f-17cd-4550-831c-8ead2a09cd95.png">

Pass these values in your workflow file:

```yml

...
steps:
  -
    name: run audit
    uses: gh-customer-success/github-user-audit@main
    with:
      api_token: ${{ secrets.MY_SECRET_TOEKN }}
      owner: ${{ vars.MY_ORG_NAME }}
    id: audit
 ...
 
```

When the run is successful  you should see a Job Summary with the total number of users for each `permission` and an artifact that can be downloaded.

<img width="568" alt="image" src="https://user-images.githubusercontent.com/680463/231046930-7e09e29c-07c0-4d2b-9866-99ec82dfffc1.png">







