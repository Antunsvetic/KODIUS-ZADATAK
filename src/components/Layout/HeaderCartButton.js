import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton (props) {

    const cartCtx = useContext(CartContext);
    const[btnIsHighlited, setBtnIsHighlited] = useState(false);

    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) =>{
        return currentNumber + item.amount;
    }, 0)

    const {items} = cartCtx;

    const btnClasses = `${classes.button} ${btnIsHighlited ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlited(true);

        const timer = setTimeout(() => {
            setBtnIsHighlited(false);
        }, 300);

        return () => {
          clearTimeout(timer);
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onOpen}> 
        <span className={classes.icon}><CartIcon /></span>
        <span>Your cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;