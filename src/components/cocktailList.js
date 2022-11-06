import '../assests/cocktailList.css';
import React, { useContext } from 'react';
import { AppContext } from '../context';
import Cocktail from './cocktail';

function CocktailList() {
    const { asyncLock, cocktails } = useContext(AppContext);

    if (asyncLock) {
        // loading anim
    }

    return cocktails.length > 0 ? (
        <section className="section">
          <h2 className="section-title">cocktails</h2>
          <div className="cocktails-center">
              {cocktails.map(item => {
                  return <Cocktail key={item.id} {...item} />
              })}
          </div>
        </section>
    ) : (
        <h2 className="section-title">No Cocktail Recipe Found!</h2>
    );
}

export default CocktailList;
