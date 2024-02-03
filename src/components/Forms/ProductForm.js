import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";

import "./ProductForm.scss";

const ProductForm = props => {
    const [productName, setProductName] = useState("");
    const input = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        if (productName.trim() !== "") {
            props.onAddProduct(props.selectedListId, productName);
            setProductName("");
            input.current.focus();
        } else {
            alert("Campul e gol");
        }
    }

    return (
        <form className={`product-form`} onSubmit={handleSubmit}>
            <input type="text" ref={input} value={productName} onChange={e => setProductName(e.target.value)} placeholder="Produs de cumparat" />
            <button type="submit"><span>+</span></button>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        selectedListId: state.selectedListId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddProduct: (listId, productName) => dispatch({ type: actionTypes.ITEM_ADD, listId, productName })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);