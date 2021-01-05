import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { BsX } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import random from "random";
import localforage from "localforage";
import "./App.scss";
import RandoList from "./components/RandoList";
import sayings from "./sayings";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [modalOpen, setModal] = useState(false);
  const [dontShowAgain, setDSA] = useState(false);

  useEffect(() => {
    localforage.getItem("hideModal").then((data) => {
      if (!data) {
        setModal(true);
      } else {
        setDSA(true);
      }
    });
  }, []);

  function toggleModal() {
    setModal(!modalOpen);
  }

  function hideAroo() {
    setModal(false);
    setDSA(true);
    localforage.setItem("hideModal", true);
  }

  function showModal() {
    setModal(true);
  }

  const closeBtn = (
    <button
      type="button"
      aria-label="Close this modal."
      className="close"
      onClick={toggleModal}
    >
      <BsX />
    </button>
  );

  function renderHowTo() {
    const modal = (
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} close={closeBtn}>
          Hi-dilly-ho, neighborinos!
        </ModalHeader>
        <ModalBody>
          <p className="font-weight-bold">
            Here's how you use my granny smithish app tapple-roonie!
          </p>
          <ol>
            <li className="mt-1">
              Create some list items for this list using the{" "}
              <span className="pink-border">pink button</span>
            </li>
            <li className="mt-1">
              Press the <span className="green-border">green button</span> to
              randomize a selection within the list
            </li>
            <li className="mt-1">
              Use it to help you make decisions like which Bible passage to read
              or which soda pop to sip
            </li>
            <li>
              You can clear the list with the{" "}
              <span className="red-border">red button</span>.
            </li>
            <li className="mt-1">
              Then just poke your nose around and explore
            </li>
          </ol>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            aria-label="Do not show me this message again."
            color="primary"
            disabled={dontShowAgain ? true : false}
            onClick={hideAroo}
          >
            Don't show again
          </Button>{" "}
          <Button
            type="button"
            aria-label="Close this modal."
            color="danger"
            onClick={toggleModal}
          >
            Dismiss
          </Button>
        </ModalFooter>
      </Modal>
    );

    return modal;
  }

  function makeRandomToast() {
    toast(sayings[random.int(0, sayings.length - 1)], {
      closeButton: <BsX />,
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
              Saved lists are coming soon! Sit tight!
              {/* <NavLink href="/components/">Components</NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <RandoList
              listData={[]}
              stacheClick={makeRandomToast}
              infoClick={showModal}
            />
          </Col>
        </Row>
        {renderHowTo()}
      </Container>
      <ToastContainer />
    </>
  );
}
