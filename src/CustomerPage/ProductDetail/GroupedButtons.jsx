import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function GroupedButtons(props) {
  const {counter, setCounter, stock} = props


  function handleIncrement(){
    setCounter(state => state + 1);
  };

  function handleDecrement(){
    setCounter(state => state - 1);
  };
  return (
    <div><ButtonGroup size="small" aria-label="small outlined button group">
      {<Button disabled = {counter <= 1 ? true: false } onClick={handleDecrement}>-</Button>}
        {<Button disabled>{counter}</Button>}
        <Button disabled = {counter === stock ? true: false } onClick={handleIncrement}>+</Button>
        
      </ButtonGroup></div>
  )
}
