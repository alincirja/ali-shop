import React from "react";
import { connect } from "react-redux";

import ProductForm from "../../Forms/ProductForm";
import Product from "./Product/Product";

import * as actionTypes from "../../../store/actions";

import "./Single.scss";

const Single = props => {
    const selectedList = props.shoppingLists[props.selectedListId];
    const { products } = selectedList;
    let status = 0;
    if (products.length) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].purchased) {
                status += 1;
            }
        }
    }
    return (
        <div className="single-list">
            <header>
                <div className="go-back" onClick={() => props.goBack("")}>
                <span className="btn-back"></span>
                </div>
                <h4>{selectedList.name}</h4>
                <div className="status">{`${status}/${products.length}`}</div>
            </header>

            <ProductForm />

            <div className={`container ${products.length ? "with-products" : ""}`}>
                {products.length ? products.map((prd, index) => <Product key={index} productId={prd.id} />) : ""}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        shoppingLists: state.shoppingLists,
        selectedListId: state.selectedListId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        goBack: (id) => dispatch({ type: actionTypes.SELECT_LIST, id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Single);