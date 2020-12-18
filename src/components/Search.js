import React from 'react';
import _ from 'lodash';

import { Link, withPrefix } from 'gatsby'

export default class Search extends React.Component {
  state = {
    query: '',
    results: [],
  }

  render() {
    return (
      <div className={this.props.classNames}>
        <input className='search__input' type='text' value={this.state.query} onChange={this.search} placeholder={'Search'} />
        <ul className='search__list'>
          {this.state.results.map((page) => (
          <li key={page.url}>
            <Link className='search__list_white search__list_non-decoration'
              to={page.url}>
              {page.title}
            </Link>
          </li>
          ))}
        </ul>
      </div>
    )
  }

  getSearchResults(query) {
    if (!query || !window.__LUNR__) return []
    const lunrIndex =  window.__LUNR__[this.props.lng];
    const results = lunrIndex.index.search(query) // you can  customize your search , see https://lunrjs.com/guides/searching.html
    return results.map(({ ref }) => lunrIndex.store[ref])
  }

  search = event => {
    const query = event.target.value
    const results = this.getSearchResults(query)
    this.setState({ results, query })
  }
}