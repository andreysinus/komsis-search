import React from "react";
import "./bucketPage.scss";

function BucketPage(props) {
  var finalPrice = 0;
  let tg = window.Telegram.WebApp;
  return (
    <div className="bucketpage">
      <div className="bucketpage__final d-grid gap-2">
        {props.cartItems.length > 0 ? (
          <div>
            {props.cartItems.map((item, index) => {
              finalPrice = Number(finalPrice + item[2] * item[1]);
              return (
                <div className="bucketpage__item">
                  <h5>{item[0]}</h5>
                  <h6>
                    {item[2]} х {item[1]} руб.
                  </h6>
                </div>
              );
              
            })}
            <h3>Итого: {finalPrice} руб.</h3>
            <button className="btn btn-primary bucketpage__btn" onClick={()=>{; tg.sendData(props.cartItems.toString())}}>Оформить заказ</button>
          </div>
        ) : (
          <h3 className="bucketpage__empty">Корзина пустая</h3>
        )}
        
        
      </div>
    </div>
  );
}

export default BucketPage;
