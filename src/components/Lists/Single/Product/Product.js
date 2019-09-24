import React, { useState } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../../../store/actions";

import "./Product.scss";

const Product = props => {
    const product = props.products.find(prd => prd.id === props.productId);

    const [showEditForm, setShowEditForm] = useState(false);
    const [newTitle, setNewTitle] = useState(product.name);

    return (
        <div className={`product ${product.purchased ? "purchased" : ""}`} onContextMenu={e => {e.preventDefault(); setShowEditForm(true);}}>
            {!showEditForm ?
            <React.Fragment>
                <span className="title">{product.name}</span>
                <span className="tick" onClick={() => props.onToggle(product.id)}></span>
            </React.Fragment> :
            <form>
                <span className="delete">Sterge</span>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                {newTitle.trim() === product.name.trim() ?
                <span className="cancel" onClick={() => setShowEditForm(false)}>&times;</span> :
                <button type="submit">&laquo;</button>}
            </form>}
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