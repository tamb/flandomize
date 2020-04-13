import React, { useState, useEffect } from "react";
import localforage from 'localforage';
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";
import random from "random";
import {AutoFontSize} from 'auto-fontsize';
import dance from "./mustache-clipart-7.png";
import './RandoList.scss'

class ListItem {
  constructor(title) {
    this.title = title;
    this.count = 0;
  }
}

export default function RandoList(props) {
  const [activeItem, setActiveItem] = useState(null);
  const [prevActive, setPrevActive] = useState(0);
  const [listData, setListData] = useState(props.listData);
  const [spinning, setSpinning] = useState(false);

  useEffect(()=>{
    localforage.setItem("RandoList", listData);
  });

  useEffect(()=>{
    localforage.getItem("RandoList").then(data => {
        data = data || [];
        setListData(data);
    });
  },[]);

  function cycleToInt(prev, list) {
      setSpinning(true);
    const cycles = random.int(3, 7);
    const goal = random.int(0, list.length - 1);
    let index = prev;
    let passes = 0;

    console.log(
      "PASSES",
      passes,
      "INDEX",
      index,
      "GOAL",
      goal,
      "CYCLES",
      cycles
    );

    while (passes <= cycles || index !== goal) {
      ++index;
      if (index >= list.length) {
        index = 0;
      }
      console.log(index);
      if (index === prev) {
        console.log("PASSED", prev);
        passes = passes + 1;
      }

      setActiveItem(null);
    }
    setTimeout(() => {
      setActiveItem(index);
      const newList = listData.slice(0);
      newList[index].count = newList[index].count + 1;
      setListData(newList);
    }, 300);
    setPrevActive(index);
    setTimeout(()=>{
        setSpinning(false);
    }, 1000);
  }

  function removeItem(index){
    const newList = listData.slice(0);
    newList.splice(index, 1);
    setListData(newList);
  }

  function renderList() {
    return listData.map((item, i) => {
      return (
        <li key={i} className={`${activeItem === i ? "active" : ""}`}>
          <div className="d-flex align-items-center">
            <AutoFontSize minTextSize={16}
              textSize={28}
              textSizeStep={2}
              targetLines={1}
              targetElementType="span" 
              text={item.title}/>
            <span>|&nbsp;{item.count}</span>
            <button className="clear-btn x-icon" onClick={()=>removeItem(i)} type="button" aria-label="remove item">
              &times;
            </button>
          </div>
        </li>
      );
    });
  }

  function randomize() {
    cycleToInt(prevActive, listData);
  }

  function addToList(e) {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const newList = listData.slice(0);
    if (input.value.length > 0){
        newList.push(new ListItem(input.value));
    } else {
        alert('Please enter a value... doodly!');
    }
    setListData(newList);
    input.value = "";
  }

  function clearList(){
      setListData([]);
  }

  return (
    <>
      <Row>
        <Col xs="12" md="6" className="mb-5 border-bottom">
          <h2><span role="img"aria-label="point">👉</span> <span className="text-underline">{listData[activeItem] ? listData[activeItem].title : ""}</span></h2>
        </Col>
      </Row>
      <Row>
        <Col xs="9">
          <ul id="todos">{renderList()}</ul>
        </Col>
        <Col xs="3" id="mustache-container">
          <img alt="mustache" onClick={props.stacheClick} className={`img-fluid ${spinning? 'spin' : ''}`} src={dance} />
        </Col>

        <Col xs="12" md="6">
          <Row>
            <Col>
              <Form onSubmit={addToList}>
                <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button id="add-item-btn" type="submit">Add an item, strangerino</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Col>
          </Row>

          <Row id="footer">
            <Col xs="12" className="mt-3">
              <Button
                size="lg"
                disabled={listData.length <= 1}
                block
                color="success"
                type="button"
                className="text-light randomize-btn d-md-none d-lg-none d-xl-none"
                onClick={randomize}
              >
                Ran-diddly-andomize!
              </Button>
              <Button
                size="lg"
                disabled={listData.length <= 1}
                type="button"
                color="success"
                className="text-light randomize-btn d-none d-sm-none d-md-block"
                onClick={randomize}
              >
                Ran-diddly-andomize!
              </Button>
            </Col>
            <Col xs="12" md="6" className="mt-3">
              <Button
                size="lg"
                disabled={listData.length <= 0}
                color="danger"
                type="button"
                onClick={clearList}
              >
                clear-a-roonie
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
