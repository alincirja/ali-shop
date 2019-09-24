import React, { useState } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";

import "./ListForm.scss";

const ListForm = props => {
    const [listName, setListName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (listName.trim() !== "") {
            props.onAddList(listName);
        }
    }

    return (
        <form className={`list-form ${props.show ? "show" : ""}`} onSubmit={handleSubmit}>
            <div className="container">
                <label>Creaza o noua lista</label>
                <input type="text" value={listName} onChange={e => setListName(e.target.value)} placeholder="Cumparaturi" />
                <button type="submit">Creare</button>
            </div>
        </form>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddList: (listName) => dispatch({ type: actionTypes.LIST_CREATE, listName })
    };
};

export default connect(null, mapDispatchToProps)(ListForm);