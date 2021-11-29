import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (lastState, action) => {
  if (action.type === "ADD_ITEM") {
    let updatedItems;
    const existingCartItemIndex = lastState.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const existingCartItem = lastState.items[existingCartItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...lastState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = lastState.items.concat(action.item);
    }
    const updatedTotalAmount =
      lastState.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const itemIndex = lastState.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingItem = lastState.items[itemIndex];
    const updatedTotalAmount = lastState.totalAmount - existingItem.price;
    //console.log(existingItem);
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = lastState.items.filter((item) => {
        return action.id !== item.id;
      });
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...lastState.items];
      updatedItems[itemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
