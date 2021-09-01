import React, { useState } from "react";

export default function FilterPanel ({onUpdateTerm}) {

    const [value, setValue] = useState('');

    const onChangeInput = e => {
        setValue(e.target.value);
    }

    return (
        <form
            className="FilterPanel d-flex mb-3 mt-1"
            onSubmit={ (e) => {
                e.preventDefault();
                onUpdateTerm(value);
            } }
        >
            <input
                className="FilterPanel__input form-control"
                type="text"
                placeholder="filter"
                value={ value }
                onChange={ onChangeInput }
            />
            <button className="btn btn-outline-success" type="submit">Найти</button>
        </form>
    );
}