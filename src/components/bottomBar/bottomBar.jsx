import React from "react";
import "./bottomBar.scss";

function BottomBar(props) {
  let searchStyle="bottombar__button"
  let bucketStyle="bottombar__button"
  if (props.page===1) searchStyle+=" active"
  else bucketStyle+=" active"
  return (
    <div className="bottombar">
      <button className={searchStyle} onClick={()=>props.setPage(1)}>Поиск</button>
      <button className={bucketStyle} onClick={()=>props.setPage(2)}>Корзина</button>
    </div>
  );
}

export default BottomBar;
