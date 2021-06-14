import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Recipe from "./Recipe";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { HiOutlineAdjustments } from "react-icons/hi";
import { useSpring, animated } from "react-spring";
import { Dialog, DialogContent } from "@material-ui/core";

export default function Home() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState();
  const [areas, setArea] = useState();
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState({});

  return (
    <div className="container home">
      <header>
        <h1 className="m-4">Food Recipes </h1>
      </header>
      <Search
        search={search}
        setSearch={setSearch}
        setQuery={setQuery}
        query={query}
        areas={areas}
        setArea={setArea}
        recipes={recipes}
        setRecipes={setRecipes}
        category={category}
        setCategory={setCategory}
      />
      <Content
        areas={areas}
        setArea={setArea}
        query={query}
        search={search}
        setSearch={setSearch}
        recipes={recipes}
        setRecipes={setRecipes}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
}

// {Search Functionality section}
function Search({
  category,
  setCategory,
  search,
  recipes,
  setRecipes,
  setSearch,
  setQuery,
  query,
  areas,
  setArea
}) {
  const [filter, showFilter] = useState(false);
  const animation = useSpring({
    config: {
      duration: 100
    },
    reverse: filter,
    opacity: filter ? 1 : 0
  });
  return (
    <>
      <div className="food-search-box">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button className="filter-btn" onClick={() => showFilter((on) => !on)}>
          <HiOutlineAdjustments />
        </button>
      </div>
      <animated.div style={animation}>
        <Dialog open={filter} maxWidth="md" onClose={() => showFilter(false)}>
          <DialogContent>
            <Filter
              areas={areas}
              setArea={setArea}
              setQuery={setQuery}
              showFilter={showFilter}
              query={query}
              recipes={recipes}
              setRecipes={setRecipes}
              category={category}
              setCategory={setCategory}
            />
          </DialogContent>
        </Dialog>
      </animated.div>
    </>
  );
}

// Content Section

function Content({ query, search, setArea, recipes, setRecipes, setCategory }) {
  const nameUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=c";
  const areaUrl = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  const edaAPI = `https://api.edamam.com/search?q=${query}&app_id=0bf36c54&app_key=7811cb68bc349ca48b5468b2b0ccacbb`;
  const categoryUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  const getReceipies = async () => {
    const response = await fetch(nameUrl);
    const meal = await response.json();
    setRecipes(meal.meals);
  };
  const getAreas = async () => {
    const response = await fetch(areaUrl);
    const area = await response.json();
    setArea(area.meals);
  };
  const getCategory = async () => {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    setCategory(data.categories);
  };
  useEffect(() => {
    getReceipies();
    getAreas();
    getCategory();
    // history.push(`/foodrecipies`);
  }, []);
  return (
    <Container>
      <h3 className="cuisine-title">Explore New Tastes</h3>
      <div className="row row-cols-1 row-cols-md-4">
        {recipes
          .filter((recipe) => {
            if (!query) {
              return recipe;
            } else if (query === recipe.strArea) {
              return recipe;
            }
          })
          .filter((recipe) => {
            if (search === "") {
              return recipe;
            } else if (
              recipe.strMeal.toLowerCase().includes(search.toLowerCase())
            ) {
              return recipe;
            }
          })
          .map((recipe, index) => (
            <Recipe
              key={index}
              title={recipe.strMeal}
              image={recipe.strMealThumb}
              ingredient={recipe.strInstructions}
              cuisineType={recipe.strArea}
              index={index}
              setRecipes={setRecipes}
              recipes={recipes}
            />
          ))}
      </div>
    </Container>
  );
}
