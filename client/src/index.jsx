import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    this.fetch();

  }

  fetch() {
    console.log('Fetching repos from DB...');
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      dataType: 'json',
      error: function() {
        console.log('ERROR occurred with GET request from client!');
      },
      success: (repoList) => {
        console.log('SUCCESS: GET request from client was successful!\n\n', repoList);
        this.setState({
          repos: repoList
        });
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: JSON.stringify({term}),
      contentType: 'application/json',
      error: function() {
        console.log('ERROR occurred with POST request from client!');
      },
      success: function() {
        console.log(`SUCCESS: POST request from client for search term ${term} was successful!`);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));