import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [ordedIsPressed, setOrderIsPressed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addItemToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setOrderIsPressed(true);
  };

  const confirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://trgovina-82ed8-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
          totalAmount: { totalAmount },
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul>
      {" "}
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemFromCartHandler.bind(null, item.id)}
          onAdd={addItemToCartHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalButtons = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalItems = (
    <React.Fragment>
      <div className={classes["cart-items"]}>
        {cartItems}
        <div className={classes.total}>
          <span>Total amount:</span>
          <span>{totalAmount}</span>
        </div>
        {ordedIsPressed && (
          <Checkout onConfirm={confirmHandler} onCancel={props.onClose} />
        )}
        {!ordedIsPressed && modalButtons}
      </div>
    </React.Fragment>
  );

  const modalIsSubmitting = <p>Submitting in progress...</p>;

  const modalIsSubmitted = (
    <React.Fragment>
      <p>Sucessfully submitted !</p>
      <div className={classes.actions}>
        <button className={classes.buitton} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalItems}
      {isSubmitting && !didSubmit && modalIsSubmitting}
      {!isSubmitting && didSubmit && modalIsSubmitted}
    </Modal>
  );
}

export default Cart;
