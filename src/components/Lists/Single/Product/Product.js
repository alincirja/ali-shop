import React from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../../../store/actions";

import "./Product.scss";

const Product = props => {
    const product = props.products.find(prd => prd.id === props.productId);
    return (
        <div className={`product ${product.purchased ? "purchased" : ""}`} onContextMenu={e => {e.preventDefault(); props.setContextProduct(product.id);}}>
            <div className="info">
                <span className="title">{product.name}</span>
                <span className="tick" onClick={() => props.onToggle(product.id)}></span>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        products: state.shoppingLists[state.selectedListId].products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggle: (itemId) => dispatch({ type: actionTypes.ITEM_TOGGLE_PURCHASING, itemId })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);