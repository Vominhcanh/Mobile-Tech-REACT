import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./../Loading/Loading";

export const ProductItems = ({ cartItems, product }) => {
  const [loading, setloading] = useState(null);
  return (
    <>
      <div className="product_items">
        {product?.map((items) => (
          <Link to={`/productdetails/${items._id}`} key={items._id}>
            <div className="box">
              <div className="img">
                <img src={items.img} alt="..." />
              </div>
              <div className="details">
                <h3>{items.name.slice(0, 30)}...</h3>
                <p>
                  {items.cpu} <span>Ram {items.ram} GB</span>
                </p>
                <h6>
                  Giá: {String(items.price).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                  vnđ
                </h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
