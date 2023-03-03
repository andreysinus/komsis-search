import React from "react";
import SearchBar from "../components/searchBar/searchBar";
import SearchItem from "../components/searchItem/searchItem";

function SearchPage(props) {
  return (
    <div id="search">
      <SearchBar
        setValue={props.setValue}
        value={props.value}
        sort={props.sort}
        setSort={props.setSort}
        setFilterModal={props.setFilterModal}
      />
      <div className="searchresults">
        {props.searchResults.length > 0 ? (
          props.searchResults.map((item, index) => {
            return <SearchItem setSnackbarOpen={props.setSnackbarOpen} updateCartItems={props.updateCartItems} item={item["_source"]} />;
          })
        ) : (
          <p сlassName="searchresults__title">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
