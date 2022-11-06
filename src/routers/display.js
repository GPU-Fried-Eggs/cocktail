import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Fraction from "fraction.js";

const max = 15;

function Display() {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);
    const [count, setCount] = useState(1);

    useEffect(() => {
        void async function getCocktail() {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                if ("drinks" in data) {
                    const drink = data.drinks[0], ingredients = new Array(15);
                    for (let i = 0; i < max; i++)
                        ingredients[i] = {
                            ingredient: drink[`strIngredient${i + 1}`],
                            measure: drink[`strMeasure${i + 1}`]
                        };
                    setCocktail({
                        name: drink["strDrink"],
                        image: drink["strDrinkThumb"],
                        info: drink["strAlcoholic"],
                        category: drink["strCategory"],
                        glass: drink["strGlass"],
                        instructions: drink["strInstructions"],
                        ingredients: ingredients.filter(({ measure }) => measure !== null)
                    });
                } else {
                    setCocktail(null);
                }
            } catch (error) { console.log(error) }
        }();
    }, [id]);

    function formatIngredient({ ingredient, measure }) {
        const elements = measure.trim().split(" ");
        const units = elements.filter(data => /([a-z])/g.test(data));
        const amounts = elements
            .filter(data => /([0-9,/])/g.test(data))
            // eslint-disable-next-line no-new-func
            .map(data => (new Function("count", `return ${data} * count`))(count));
        return `${ingredient} ${new Fraction(amounts.reduce((pre, cur) => pre + cur, 0)).toFraction(true)} ${units.join(" ")}`;
    }

    if (!cocktail) {
        return <h2 className="section-title">no cocktail to display</h2>;
    } else {
        const { name, image, category, info, glass, instructions, ingredients } = cocktail;
        return (
            <section className="section cocktail-section">
              <Link to="/" className="section-back"> &lt;-- back home </Link>
              <h2 className="section-title">{name}</h2>
              <input className="section-count" min={1} type="number" value={count} onChange={event => setCount(event.target.value)}/>
              <div className="drink">
                <img src={image} alt={name}></img>
                <div className="drink-info">
                  <div><span className="drink-data">name :</span> {name}</div>
                  <div><span className="drink-data">category :</span> {category}</div>
                  <div><span className="drink-data">info :</span> {info}</div>
                  <div><span className="drink-data">glass :</span> {glass}</div>
                  <div>
                      <span className="drink-data">instructons :</span>
                      <p>{instructions}</p>
                  </div>
                  <div>
                    <span className="drink-data">ingredients :</span>
                    <ul>
                        {ingredients.map((item, index) => {
                            return item ? <li key={index}> {formatIngredient(item)}</li> : null
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
        )
    }
}

export default Display;
