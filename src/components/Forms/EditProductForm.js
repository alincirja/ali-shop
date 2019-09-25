import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";

import "./EditProductForm.scss";

const EditProductForm = props => {
    const product = props.products.find(prd => prd.id === props.contextProduct);
    const [editedName, setEditedName] = useState(product.name);
    const input = useRef(null);

    useEffect(() => {
        input.current.focus();
    }, []);

    const submitForm = e => {
        e.preventDefault();

        if (editedName.trim() === product.name.trim()) {
            props.setContextProduct("");
        } else {
            props.onEdit(product.id, editedName);
            props.setContextProduct("");
        }
    };

    return (
        <div className="product-context">
            <div className="overlay"></div>
            <div className="container">
                <span className="close-pc" onClick={() => props.setContextProduct("")}>&#10006;</span>
                <form onSubmit={submitForm}>
                    <h5>Editare</h5>
                    <input type="text" ref={input} value={editedName} onChange={e => setEditedName(e.target.value)} />
                    <button type="submit">Salveaza</button>
                </form>

                <button className="delete" onClick={() => {
                    props.onDelete(product.id);
                    props.setContextProduct("");
                }}>Sterge</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        products: state.shoppingLists[state.selectedListId].products
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEdit: (itemId, newName) => dispatch({ type: actionTypes.ITEM_EDIT, itemId, newName }),
        onDelete: itemId => dispatch({ type: actionTypes.ITEM_DELETE, itemId })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm);