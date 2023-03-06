import React, { useState } from "react";
import "./searchItem.scss";

function SearchItem(props) {
  const [count, setCount] = useState(0)
  
  const addToCount = () =>{
    setCount(Number(count+1))
  }
  const removeFromCount = () =>{
    if (count>0) setCount(Number(count-1))
  }
  return (
    <div className="searchitem">
      <div>
        <a className="searchitem__title" href="#1" onClick={()=>{props.setCurrentSlug(props.item["slug"]);}}>{props.item["title"]}</a>
        {props.item["countCherepovets"] === 0 &&
        props.item["countVologda"] === 0 ? (
          <p className="searchitem__stock-title">Нет в наличии</p>
        ) : (
          <div>
            <p className="searchitem__stock-title">Наличие:</p>
            <div className="searchitem__stock">
              <p className="searchitem__stock-title">
                Череповец: {props.item["countCherepovets"]}, Вологда:{" "}
                {props.item["countVologda"]}
              </p>
            </div>
          </div>
        )}

        <p className="searchitem__price">
          Цена
          {props.item["price"] > 0
            ? ": " + props.item["price"] + " руб."
            : " по запросу"}
        </p>
      </div>{" "}
      <div className="searchitem__buttons">
        <div className="searchitem__buttons-add">
          <button className="searchitem__buttons-butt" onClick={()=>removeFromCount()}>-</button>
          <p className="searchitem__buttons-count">{count}</p>
          <button className="searchitem__buttons-butt" onClick={()=>addToCount()}>+</button>
        </div>
        <button className={count>0?"btn btn-primary":"btn btn-secondary"} onClick={()=>{if (count>0) props.updateCartItems(props.item, count); setCount(0); props.setSnackbarOpen(true)}}>В корзину</button>
      </div>
    </div>
  );
}

export default SearchItem;
