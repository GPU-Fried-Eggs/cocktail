import '../assests/search.css';
import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';

function Search() {
    const { setSearchTerm } = useContext(AppContext);
    const searchValue = useRef("");

    useEffect(() => searchValue.current.focus(), []);

    function searchCocktail() {
        setSearchTerm(searchValue.current.value)
    }

    return (
        <section className="search">
          <form className="search-form" onSubmit={event => event.preventDefault()}>
            <div className="form-control">
              <label htmlFor="name">Find a cocktail</label>
              <input type="text" id="name" ref={searchValue} onChange={searchCocktail}/>
            </div>
          </form>
        </section>
    );
}

export default Search;
