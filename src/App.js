import React, {Component} from 'react';
import Table from './Table/Table';
import Button from './Button/Button';
import Search from './Search/Search';
import ButtonWithLoading from './Loading/Loading';

import './App.css';
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  PATH_SEARCH,
  PATH_BASE,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  updateSearchTopstoriesState
} from './App.consts';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  fetchSearchTopstories(searchTerm, page) {
    this.setState({
      isLoading: true
    });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onDismiss(id) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];

    const isNotId = (item) => item.objectID !== id;
    const updatetHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updatetHits, page}
      }
    });
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }


  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.setState({
      searchKey: searchTerm
    });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  setSearchTopstories(result) {
    const {hits, page} = result;

    this.setState(updateSearchTopstoriesState(hits, page));
  }


  componentDidMount() {
    const {searchTerm} = this.state;
    this.setState({
      searchKey: searchTerm
    });
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      isLoading,
    } = this.state;

    const page = (
        results &&
        results[searchKey] &&
        results[searchKey].page
      ) || 0;

    const list = (
        results &&
        results[searchKey] &&
        results[searchKey].hits
      ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        <Table
          list={list}
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    )
  }

}


export default App;

export {
  Button,
  Search,
  Table
};