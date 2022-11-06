import React from 'react'
import Search from '../components/search';
import CocktailList from '../components/cocktailList';

function Home() {
    return(
        <main>
          <Search />
          <CocktailList />
        </main>
    );
}

export default Home;
