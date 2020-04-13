import React, {useState} from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand
} from "reactstrap";
import "./App.css";
import RandoList from "./components/RandoList";

export default function App() {

  return (
    <>
      <Navbar color="dark" dark expand="md" id="nav">
        <NavbarBrand href="/">Flandomize <span role="img"aria-label="wave">👋</span></NavbarBrand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <RandoList listData={[]} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
