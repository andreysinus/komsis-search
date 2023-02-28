import React from "react";
import "./bucketPage.scss"

function BucketPage() {
  return (
    <div className="bucketpage">
      <div className="bucketpage__item">
        <h5>труба металлопластиковая 26x3.0</h5>
        <h6>2 х 168.9 руб.</h6>
      </div>
      <div className="bucketpage__final d-grid gap-2">
        <h3>Итого: 337.8 руб.</h3>
        <button className="btn btn-primary">Оформить заказ</button>
      </div>
    </div>
  );
}

export default BucketPage;
