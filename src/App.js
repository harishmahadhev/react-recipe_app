import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import PriceCart from "./Prizecart";

export default function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/health"> Page Under Development</Route>
        <Route path="/cart">
          <PriceCart />
        </Route>
      </Switch>
    </>
  );
}

function NavBar() {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link
              to="/home"
              className="link"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/health"
              className="link"
              style={{ textDecoration: "none" }}
            >
              Recipes
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/cart"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <FaShoppingCart />
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
