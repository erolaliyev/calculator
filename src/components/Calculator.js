import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";
import "./Calculator.css";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState("0");

  useEffect(() => {}, [operation, nextValue, prevValue]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = (prevValue, operation, nextValue) => {
    let temp = CalculatorOperations[operation](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOperation(null);
    setNextValue(String(temp));
    setPrevValue(null);
    setResult(String(temp));
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };

  const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };

  const clearData = () => {
    setPrevValue(0);
    setNextValue("0");
    setResult("0");
  };

  const handleOperation = (value) => {
    if (Number.isInteger(+value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (operation === null) {
        setOperation(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (operation) {
        setOperation(value);
      }
      if (prevValue && operation && nextValue) {
        performOperation(prevValue, operation, nextValue);
      }
    } else if (value === "AC") {
      clearData();
    } else if (value === "\xB1") {
      changeSign();
      alert(value);
    } else if (value === ".") {
      insertDot();
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-input">
        <div className="result">{result}</div>
      </div>
      <div className="calculator-keypad">
        <div className="keys-function">
          <CalculatorKey keyValue={"AC"} onClick={handleOperation} />
          <CalculatorKey keyValue={"\xB1"} onClick={handleOperation} />
        </div>
        <div className="keys-operators">
          <CalculatorKey keyValue={"+"} onClick={handleOperation} />
          <CalculatorKey keyValue={"-"} onClick={handleOperation} />
          <CalculatorKey keyValue={"*"} onClick={handleOperation} />
          <CalculatorKey keyValue={"/"} onClick={handleOperation} />
          <CalculatorKey keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="keys-numbers">
          <CalculatorKey keyValue={"9"} onClick={handleOperation} />
          <CalculatorKey keyValue={"8"} onClick={handleOperation} />
          <CalculatorKey keyValue={"7"} onClick={handleOperation} />
          <CalculatorKey keyValue={"6"} onClick={handleOperation} />
          <CalculatorKey keyValue={"5"} onClick={handleOperation} />
          <CalculatorKey keyValue={"4"} onClick={handleOperation} />
          <CalculatorKey keyValue={"3"} onClick={handleOperation} />
          <CalculatorKey keyValue={"2"} onClick={handleOperation} />
          <CalculatorKey keyValue={"1"} onClick={handleOperation} />
          <CalculatorKey
            className="key-dot"
            keyValue={"."}
            onClick={handleOperation}
          />
          <CalculatorKey
            className="key-zero"
            keyValue={0}
            onClick={handleOperation}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
