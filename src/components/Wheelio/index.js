import React, { useEffect, useState, createRef } from "react";
import { Col, Row, Button } from "reactstrap";
import randomColor from "randomcolor";
import "./Wheelio.scss";

// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent() {
  const el = document.createElement("fakeelement");

  const transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
  };

  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

const transitionEvent = whichTransitionEvent();
const slices = Array(13).fill("Hi");
let WHEEL_SIZE = 300;

function getRandomDegrees() {
  return Math.floor(Math.random() * 1245) + 730;
}

function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);

  return [x, y];
}

function App() {
  const percentage = 100 / slices.length / 100;
  // const angle = 360 / slices.length;
  let cumulativePercent = percentage;
  let cumulativePercentText = percentage;
  const $wheel = createRef();

  const [deg, setDeg] = useState(getRandomDegrees());

  function rotate() {
    $wheel.current.style.webkitTransform = "rotate(" + deg + "deg)";
    $wheel.current.style.mozTransform = "rotate(" + deg + "deg)";
    $wheel.current.style.msTransform = "rotate(" + deg + "deg)";
    $wheel.current.style.oTransform = "rotate(" + deg + "deg)";
    $wheel.current.style.transform = "rotate(" + deg + "deg)";
    setDeg(deg + getRandomDegrees());
  }

  const WheelCSS = {
    height: `${WHEEL_SIZE}px`,
    width: `${WHEEL_SIZE}px`,
    borderRadius: "50%",
    border: "3px solid",
    position: "relative",
  };

  function wireWheelStopHandler() {
    document.addEventListener(transitionEvent, (e) => {
      if (e.target.id === "jsWheel") {
        console.log("Wheel stop");
      }
    });
  }
  useEffect(() => {
    wireWheelStopHandler();
  }, []);

  function renderSlices() {
    return slices.map((slice, i) => {
      const startX = getCoordinatesForPercent(
        cumulativePercent - percentage
      )[0];
      const startY = getCoordinatesForPercent(
        cumulativePercent - percentage
      )[1];
      const endX = getCoordinatesForPercent(cumulativePercent)[0];
      const endY = getCoordinatesForPercent(cumulativePercent)[1];

      const largeArcFlag = 0;

      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `L 0 0`,
      ].join(" ");

      const color = randomColor({ luminosity: "light" });
      cumulativePercent += percentage;

      const pathStyle = {
        position: "relative",
        opacity: 0.5,
      };

      return (
        <g data-index={i} key={i}>
          <path d={pathData} fill={color} style={pathStyle}></path>
          <line
            x="0"
            y="0"
            x2={endX}
            y2={endY}
            stroke="black"
            strokeWidth=".5%"
          />
        </g>
      );
    });
  }

  function renderText() {
    return slices.map((slice, i) => {
      const textAngle = ((cumulativePercentText - percentage / 2) * 360) / 2;
      const style = {
        position: "absolute",
        left: `${WHEEL_SIZE / (i + 1.5)}px`,
        top: `${0 + (WHEEL_SIZE / 2 + i)}px`,
        transform: `rotate(${textAngle}deg)`,
        transformOrigin: "50%",
      };
      cumulativePercentText += percentage;
      return (
        <div key={i} style={style}>
          Hello {i}
        </div>
      );
    });
  }

  const svgCSS = {
    transform: `rotate(-0.25turn)`,
  };

  return (
    <>
      <Row>
        <Col>
          <div className="App">
            <div className="Wheel" id="jsWheel" ref={$wheel} style={WheelCSS}>
              <svg viewBox="-1 -1 2 2" style={svgCSS}>
                {renderSlices()}
              </svg>
              {renderText()}
            </div>
            <div className="Arrow left"></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={rotate}
            className="d-md-none mt-5"
            block
            size="lg"
            color="success"
            type="button"
          >
            spin!
          </Button>

          <Button
            className="d-none d-sm-none d-md-block"
            size="lg"
            color="success"
            type="button"
            onClick={rotate}
          >
            spin!
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Wheelio;
