import React, { useState, useEffect } from "react";
import localforage from "localforage";
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { BsInfoSquareFill, BsX } from "react-icons/bs";
import random from "random";
import { AutoFontSize } from "auto-fontsize";
import dance from "./mustache-clipart-7.png";
import "./RandoList.scss";

class ListItem {
  constructor(title) {
    this.title = title;
    this.count = 0;
  }
}

export default function RandoList(props) {
  const [activeItem, setActiveItem] = useState(null);
  const [listData, setListData] = useState(props.listData);
  const [spinning, setSpinning] = useState(false);
  const [randomTimes, setRandomTimes] = useState(1);

  useEffect(() => {
    localforage.setItem("RandoList", listData);
  });

  useEffect(() => {
    localforage.getItem("RandoList").then((data) => {
      if (!data || data.length <= 0) {
        data = [
          { title: "Dr. Pep-diddly-epper", count: 0 },
          { title: "Tab-aroonie", count: 0 },
        ];
      }
      setListData(data);
    });
  }, []);

  function randomize(list) {
    //todo fix random work
    setSpinning(true);
    const cycles = randomTimes;
    const selectedItems = [];
    const items = {};

    for (let i = 0; i < cycles; i++) {
      const int = random.int(0, list.length - 1);
      if (items[int]) {
        items[int] = ++items[int];
      } else {
        items[int] = 1;
      }
      selectedItems.push(int);
    }
  }

  function removeItem(index) {
    const newList = listData.slice(0);
    newList.splice(index, 1);
    setListData(newList);
  }

  function renderList() {
    return listData.map((item, i) => {
      return (
        <li key={i} className={`${activeItem === i ? "active" : ""}`}>
          <div className="d-flex align-items-center">
            <AutoFontSize
              minTextSize={16}
              textSize={20}
              textSizeStep={2}
              targetLines={1}
              targetElementType="span"
              text={item.title}
            />
            <span aria-label="Chose the following number of times:">
              |&nbsp;{item.count}
            </span>
            <button
              className="clear-btn x-icon"
              onClick={() => removeItem(i)}
              type="button"
              aria-label="Remove this list item."
            >
              <BsX />
            </button>
          </div>
        </li>
      );
    });
  }

  function addToList(e) {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const newList = listData.slice(0);
    if (input.value.length > 0) {
      newList.push(new ListItem(input.value));
    } else {
      alert("Please enter a value... doodly!");
    }
    setListData(newList);
    input.value = "";
  }

  function clearList() {
    const r = window.confirm("Are you sure you wanna delete the ol listerino?");
    if (r === true) {
      setListData([]);
    }
  }

  function checkTimes(e) {
    const target = e.target;
    const value = parseInt(target.value.trim(), 10);
    const max = parseInt(target.getAttribute("max"));
    const min = parseInt(target.getAttribute("min"));

    if (isNaN(value) && e.type === "blur") {
      setRandomTimes(min.toString());
      return;
    }
    if (value < min) {
      alert(
        "Gimme a number greater than a goose egg! (That's zero to un-Flanders folk)"
      );
      setRandomTimes(min.toString());
      return;
    }
    if (value > max) {
      alert("Now that's too many times to randomize!");
      setRandomTimes(max.toString());
      return;
    }

    setRandomTimes(value);
  }

  return (
    <>
      <Row>
        <Col xs="12" md="6" className="mb-3">
          <h2 className="border-bottom">
            <span role="img" aria-label="point">
              👉
            </span>{" "}
            <span className="text-underline">
              {listData[activeItem] ? listData[activeItem].title : ""}
            </span>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs="9">
          <ul id="todos" aria-live="polite">
            {renderList()}
          </ul>
        </Col>
        <Col xs="3" id="mustache-container">
          <img
            alt="mustache"
            onClick={props.stacheClick}
            className={`img-fluid ${spinning ? "spin" : ""}`}
            src={dance}
          />
        </Col>

        <Col xs="12" md="6">
          <Row>
            <Col>
              <Form onSubmit={addToList}>
                <InputGroup>
                  <label className="sr-only" htmlFor="addItem">
                    Add a list item.
                  </label>
                  <Input id="addItem" placeholder="Add an item, strangerino" />
                  <InputGroupAddon addonType="append">
                    <Button
                      id="add-item-btn"
                      type="submit"
                      aria-label="Add item to list."
                    >
                      Add
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col xs="12" className="mt-3">
              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">
                  <Button
                    disabled={listData.length <= 1 ? true : false}
                    color="success"
                    type="button"
                    aria-label="Randomize the list."
                    aria-controls="todos"
                    className="text-light randomize-btn d-md-none d-lg-none d-xl-none"
                    onClick={() => randomize(listData)}
                  >
                    Ran-diddly-andomize!
                  </Button>
                  <Button
                    disabled={listData.length <= 1 ? true : false}
                    type="button"
                    color="success"
                    aria-label="Randomize the list."
                    aria-controls="todos"
                    className="text-light randomize-btn d-none d-sm-none d-md-block"
                    onClick={() => randomize(listData)}
                  >
                    Ran-diddly-andomize!
                  </Button>
                </InputGroupAddon>
                <Input
                  id="time"
                  min="1"
                  max="100"
                  type="number"
                  onChange={checkTimes}
                  onBlur={checkTimes}
                  value={randomTimes}
                />
              </InputGroup>
            </Col>
            <Col xs="8" md="6" className="mt-3">
              <Button
                disabled={listData.length <= 0 ? true : false}
                color="danger"
                type="button"
                aria-label="Clear the list."
                aria-controls="todos"
                onClick={clearList}
              >
                clear-a-roonie
              </Button>
            </Col>
            <Col
              xs="4"
              className="text-right mt-3 text-md-left text-lg-left text-xl-left"
            >
              <button
                type="button"
                id="info-icon"
                className="clear-btn"
                aria-label="Show information about this application."
                onClick={props.infoClick}
              >
                <BsInfoSquareFill />
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
