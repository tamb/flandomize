import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import random from 'random';
import "./App.css";
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


  function makeRandomToast(){
    toast(sayings[random.int(0, (sayings.length -1))]);
  }

  return (
    <>
      <Navbar color="dark" dark expand="md" id="nav">
        <NavbarBrand href="/">Flandomize <span role="img"aria-label="wave">👋</span></NavbarBrand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <RandoList listData={[]} stacheClick={makeRandomToast} />
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
}
