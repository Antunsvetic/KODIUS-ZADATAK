import { Fragment } from "react";
import store from "../../assets/store.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header (props) {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Store</h1>
            <HeaderCartButton onOpen={props.onOpenCart}/>
        </header>

        <div className={classes['main-image']}> 
            <img src={store} alt="meals"></img>
        </div>
    </Fragment>
}

export default Header;