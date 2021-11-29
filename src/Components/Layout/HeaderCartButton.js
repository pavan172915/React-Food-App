import React from "react";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const {items:toUseInContextDependencies} = cartCtx;
  //console.log(cartCtx.items)
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  const [isButtonBump, setButtonBump] = useState(false);
  useEffect(() => {
    if (toUseInContextDependencies.length === 0) {
      return;
    }
    setButtonBump(true);
    const timer = setTimeout(()=>{
      setButtonBump(false);
    },300)

    return ()=>{
      clearTimeout(timer);
    }
  }, [toUseInContextDependencies]);
  const bumpClasses = `${classes.button} ${isButtonBump ? classes.bump : ""}`;
  return (
    <button className={bumpClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
