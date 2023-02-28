import React from "react";
import "./bucketPage.scss"

function BucketPage() {
  return (
    <div className="bucketpage">
      <div className="bucketpage__final d-grid gap-2">
        <h3>Итого: 0 руб.</h3>
        <button className="btn btn-primary">Оформить заказ</button>
      </div>
    </div>
  );
}

export default BucketPage;
