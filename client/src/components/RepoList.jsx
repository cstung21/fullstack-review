import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br /><br />

    <table>
      <thead>
        <tr>
          <th>Repo Name</th>
          <th>Description</th>
          <th>Owner</th>
          <th>Forks</th>
        </tr>
      </thead>
        <tbody> 
          {props.repos.map((repo, idx) => (
            <tr key={repo.html_url}>
              <td><a href={repo.html_url} >{repo.name}</a></td>
              <td>{repo.description}</td>
              <td>{repo.owner.login}</td>
              <td>{repo.forks}</td>
            </tr>
          ))}
        </tbody>
    </table>  
  </div>
)

export default RepoList;