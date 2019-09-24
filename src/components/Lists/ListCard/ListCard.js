import React, { useState } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../../store/actions";

import "./ListCard.scss";

const ListCard = ({ list, selectList, deleteList }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);

    const { products } = list;
    let purchasedProductsCount = 0;
    for (let i = 0; i < products.length; i++) {
        if (products[i].purchased) {
            purchasedProductsCount += 1;
        }
    }
    const listStatus = products.length - purchasedProductsCount;

    return (
        <div className={`list-card ${listStatus === 0 ? "completed" : ""}`}>
            <button className="menu-toggle"
                onClick={() => setShowContextMenu(!showContextMenu)}
                ><span></span><span></span><span></span></button>
            <h4 className="title" onClick={() => selectList(list.id)}>
                <span className="text">{list.name}</span>
                <span className="badge">{listStatus}</span>
            </h4>
            <span onClick={() => selectList(list.id)} className="btn-go"></span>

            <ul className={`contex-menu ${showContextMenu ? "visible" : ""}`}>
                <li onClick={() => deleteList(list.id)}>Sterge Lista</li>
            </ul>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        selectedListId: state.selectedListId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectList: (id) => dispatch({ type: actionTypes.SELECT_LIST, id }),
        deleteList: (id) => dispatch({ type: actionTypes.LIST_DELETE, id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);