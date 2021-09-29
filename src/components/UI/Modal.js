import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

function Modal(props) {

    const Backdrop = (props) => {
        return <div className={classes.backdrop} onClick={props.onClose}></div>
    }    

    const Overlay = props => {
        return <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    }

    const portalModal = document.getElementById("modal");

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalModal)}
        {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalModal)}
    </Fragment>
}

export default Modal;