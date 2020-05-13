import React, {Component} from 'react';
import AppDetails from './appDetails';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      search: '',
      sort: '',
      genres: '',
      error: null,
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenre(genres) {
    this.setState({
      genres
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8100/apps';
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;
    console.log(`The following query was constructed:  ${url}`);

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null,
        })
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time'
        })
      })
  }

  render () {
    const apps = this.state.apps.map((app, i) => {
      return <AppDetails {...app} key={i} />
    })
    return (
      <main className="App">
          <h1>Google Play Apps</h1>
          <div className = "search">
            <form onSubmit={e=>this.handleSubmit(e)}>
              <label htmlFor = "search">Search for: </label>
              <input
                type="text"
                id="search"
                name="search"
                value={this.state.search}
                onChange={e=>this.setSearch(e.target.value)}
              />
              <label htmlFor = "sort">Sort by: </label>
              <select id="sort" name="sort" onChange={e=>this.setSort(e.target.value)}>
                <option value="">None</option>
                <option value="App">Name</option>
                <option value="Rating">Rating</option>
              </select>
              <label htmlFor = "genre">Genre: </label>
              <select id="genre" name="genre" onChange={e=>this.setGenre(e.target.value)}>
                <option value="">None</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
                <option value="Arcade">Arcade</option>
                <option value="Card">Card</option>
              </select>
              <button type="submit">Search</button>
            </form>
            <div className="app_error">{this.state.error}</div>
          </div>
          {apps}
      </main>
    );
  }
}

export default App;