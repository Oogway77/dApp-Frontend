/* eslint-disable */
import React from 'react';

const SearchBar = (props) => {


  return (
    <div className='searchbar'>
      <input
        className='form-control search-bar border-end-0 border'
        type='search'
        placeholder='Search'
        id='search-input'
        value={props.value}
        onChange={props.onChange}
      />
      <span className='search-icon'>
          <button className='serach-btn' type='button'>
              <i className='fa fa-search'></i>
          </button>
      </span>
    </div>
  );
}

export default SearchBar;
