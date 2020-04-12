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
import dance from "./dance.gif";

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
  }

  function renderList() {
    return listData.map((item, i) => {
      return (
        <li key={i} className={`${activeItem === i ? "active" : ""}`}>
          {item.title} | {item.count}
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
        alert('enter a value, bitch!');
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
        <Col className="md-2">
          <h2><span role="img"aria-label="thumbs up">👍</span> {listData[activeItem] ? listData[activeItem].title : ""}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs="7">
          <ul>{renderList()}</ul>
        </Col>
        <Col xs="4">
          <img alt="dancer" className="img-fluid" src={dance} />
        </Col>

        <Col xs="12">
          <Row>
            <Col>
              <Form onSubmit={addToList}>
                <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button type="submit">Add item</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Col>
          </Row>

          <Row className="footer">
            <Col xs="12" className="mt-3">
              <Button
                size="lg"
                disabled={listData.length <= 1}
                block
                color="success"
                type="button"
                onClick={randomize}
              >
                Ran-diddly-andomize!
              </Button>
            </Col>
            <Col xs="12" className="mt-3">
              <Button
                size="lg"
                disabled={listData.length <= 0}
                color="danger"
                type="button"
                onClick={clearList}
              >
                clear list
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
