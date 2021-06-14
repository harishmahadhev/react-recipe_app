import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { useReducer, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { strCtx } from "./usecontext";
import { Prizecart } from "./Prizecart";
export default function Recipe({
  title,
  image,
  ingredient,
  index,
  setRecipes,
  recipes
}) {
  const [active, setActive] = useState(true);
  const [content, showContent] = useState(false);
  const history = useHistory();
  const countReducer = (count, action) => {
    switch (action.type) {
      case "INCREMENT": {
        return count < 0 ? (count = 0) : count + action.incrementor;
      }
      case "DECREMENT": {
        return !count || count < 0
          ? (count = 0 && setActive(true))
          : count - action.decrementor;
      }
      default: {
        return count;
      }
    }
  };
  const [count, dispatch] = useReducer(countReducer, 0);
  return (
    <strCtx.Provider value={{ count }}>
      <div key={index} className="recipe">
        <div className="col mb-4 card">
          <div
            onClick={() => {
              showContent((on) => !on);
              history.push(`/home/ingredient/${title}`);
            }}
          >
            <img src={image} className="card-img-top food-image" alt={title} />
            <button className="card-title food-label">{title}</button>
          </div>
          <span className="top-right-hover">
            <button
              className="delete-btn"
              onClick={() => setRecipes(recipes.filter((e, i) => i !== index))}
            >
              <MdDelete />
            </button>
          </span>
        </div>
        {active ? (
          <Button
            className="add-to-cart"
            size="sm"
            onClick={() => setActive(false)}
          >
            Add to Cart <CgAdd />
          </Button>
        ) : (
          <div className="cart-add">
            <Button
              className="decrement color"
              size="sm"
              onClick={() => {
                dispatch({ type: "DECREMENT", decrementor: 1 });
              }}
            >
              <AiOutlineMinusCircle />
            </Button>
            <span>{count}</span>
            <Button
              className="increment color"
              size="sm"
              onClick={() => dispatch({ type: "INCREMENT", incrementor: 1 })}
            >
              <CgAdd />
            </Button>
          </div>
        )}
        <Ingredient
          content={content}
          showContent={showContent}
          ingredient={ingredient}
          title={title}
        />

        <Prizecart />
      </div>
    </strCtx.Provider>
  );
}

function Ingredient({ title, content, showContent, ingredient }) {
  const history = useHistory();
  return content ? (
    <div className="ingredient">
      <button
        className="btn btn-secondary btn-sm close"
        onClick={() => {
          showContent((on) => !on);
          history.goBack();
        }}
      >
        &times;
      </button>
      <div className="ingredient-lines">
        <h4>{title}</h4>
        <p style={{ fontFamily: "serif" }}>{ingredient}</p>
      </div>
    </div>
  ) : null;
}
