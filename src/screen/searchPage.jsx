import React from "react";
import SearchBar from "../components/searchBar/searchBar";
import SearchItem from "../components/searchItem/searchItem";

function SearchPage(props) {
  return (
    <div>
      <SearchBar setValue={props.setValue} value={props.value}/>
      <div className="searchresults">
        {props.searchResults.length > 0 ? (
          props.searchResults.map((item, index) => {
            return <SearchItem item={item["_source"]} />;
          })
        ) : (
          <p сlassName="searchresults__title">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
