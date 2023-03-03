import React from "react";
import "./searchBar.scss";

function SearchBar(props) {
  return (
    <div>
      <div className="searchbar">
        <input
          className="searchbar__input"
          type="text"
          value={props.value}
          placeholder="Поиск.."
          onChange={(event) => {
            props.setValue(event.target.value);
          }}
        />
      </div>
      <div className="filterbar">
        <div className="filterbar_sort">
          <select className="form-select" onChange={(event)=>{props.setSort(event.target.value)}}>
            <option value="1">По релевантности</option>
            <option value="2">По возрастанию цены</option>
            <option value="3">По убыванию цены</option>
          </select>
        </div>
        <button className="btn btn-secondary" onClick={()=>props.setFilterModal(true)}>Фильтры</button>
      </div>
    </div>
  );
}

export default SearchBar;
