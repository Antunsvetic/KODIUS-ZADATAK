import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formValidation, setFormValidation] = useState({
    email: true,
    adress: true,
    creditcard: true,
  });

  const emailInputRef = useRef();
  const adressInputRef = useRef();
  const creditCardInputRef = useRef();
  const promoCodeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredAdress = adressInputRef.current.value;
    const enteredCreditCard = creditCardInputRef.current.value;
    const enteredPromoCode = promoCodeInputRef.current.value;

    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredAdresssValid = !isEmpty(enteredAdress);
    const enteredCreditCardIsValid = !isEmpty(enteredCreditCard);

    setFormValidation({
      email: enteredEmailIsValid,
      adress: enteredAdresssValid,
      creditcard: enteredCreditCardIsValid,
    });

    const formIsValid =
      enteredEmailIsValid && enteredAdresssValid && enteredCreditCardIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredEmail,
      adress: enteredAdress,
      creditcard: enteredCreditCard,
      promocode: enteredPromoCode,
    });
  };

  const emailClasses = `${classes.control} ${
    formValidation.email ? "" : classes.invalid
  }`;
  const adressClasses = `${classes.control} ${
    formValidation.adress ? "" : classes.invalid
  }`;
  const creditCardClasses = `${classes.control} ${
    formValidation.creditcard ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={emailClasses}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" ref={emailInputRef} />
        {!formValidation.email && <p>Must input valid email!</p>}
      </div>
      <div className={adressClasses}>
        <label htmlFor="adress">Adress</label>
        <input type="text" id="adress" ref={adressInputRef} />
        {!formValidation.adress && <p>Must input valid adress!</p>}
      </div>
      <div className={creditCardClasses}>
        <label htmlFor="creditcard">Credit card</label>
        <input type="text" id="creditcard" ref={creditCardInputRef} />
        {!formValidation.creditcard && <p>Must input valid credit card!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="promocode">PROMO CODE</label>
        <input type="text" id="promocode" ref={promoCodeInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
