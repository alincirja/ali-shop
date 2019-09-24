import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import Header from "./components/Header/Header";
import ListForm from "./components/Forms/ListForm";
import Single from './components/Lists/Single/Single';
import ListCard from './components/Lists/ListCard/ListCard';

import * as actionTypes from "./store/actions";

import "./style/common.scss";

const App = props => {
    const [showListForm, setShowListForm] = useState(false);
    const listsArray = Object.keys(props.shoppingLists).map(key => ({id: key, ...props.shoppingLists[key]}));

    useEffect(() => {
        if (!Object.entries(props.shoppingLists).length) {
            setShowListForm(true);
        } else {
            setShowListForm(false);
        }
    }, [props.shoppingLists]);

    return (
        <React.Fragment>
            {props.selectedListId === "" ?
            <React.Fragment>
                <Header showListForm={showListForm} setShowListForm={setShowListForm} />
                <ListForm show={showListForm} />

                {listsArray.length ?
                    <div className="shop-lists">{listsArray.map(list => <ListCard key={list.id} list={list} />)}</div> :
                <div className="empty-lists">
                    <h5>Nu exista liste</h5>
                    <p>Apasati + pentru a crea una</p>
                </div>}
            </React.Fragment> : <Single />}
            <div className="foot-note">Made with <span>&hearts;</span> by Alin Cîrjă</div>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        shoppingLists: state.shoppingLists,
        selectedListId: state.selectedListId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLists: lists => dispatch({ type: actionTypes.FETCH_LISTS, lists })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
