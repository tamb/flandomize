import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import random from "random";
import "./App.scss";
import RandoList from "./components/RandoList";

const sayings = [
  "I can see your doodle.",
  "What the diddly?",
  "Hi diddly ho neighborinos!",
  "I'm not thinking straight, why did I have that wine cooler last month?",
  "I show you pity, and how do you repay me? With a kick in the kididdlehopper!",
  "Call me Delta Airlines, because I can't handle all your extra baggage.",
  "Thank you for taking me to that Pinkberry place. It’s a lot less racy than its name would lead you to believe.",
  "I feel a great sadness in my bosom.",
  "You'll find I'm well worth the wait. Like a mild cheddar, I get tangy when I'm sitting on a shelf.",
  "There are some things we don't want to know. Important things.",
  "Now what can I ding dong diddly do for you?",
  "Can I make my famous mimosa? A little sparkling water in a glass full of regular water?",
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function makeRandomToast() {
    toast(sayings[random.int(0, sayings.length - 1)]);
  }

  function explainApp(){
    toast.info("Use this app to help yourself make decisions.  Like what to eat or which alchohol-free cocktail to enjoy!  Diddly do!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 18000,
    });
  }

  return (
    <>
      <Navbar color="dark" dark id="nav">
        <NavbarBrand href="/">
          Flandomize{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto text-light" navbar>
            <NavItem>
              More is coming so just sit tight while I tinker.
              {/* <NavLink href="/components/">Components</NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        <button type="button" id="info-icon" className="clear-btn" onClick={explainApp}>
          <span role="img" aria-label="information">ℹ️</span>
        </button>
        <Row>
          <Col>
            <RandoList listData={[]} stacheClick={makeRandomToast} />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}
