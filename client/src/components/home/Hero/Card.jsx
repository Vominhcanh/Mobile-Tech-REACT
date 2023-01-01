import React from "react";
import { hero } from "../../assets/data/data";
import { Link } from "react-router-dom";

export const Card = () => {
  return (
    <>
      <section className="cards">
        {hero.map((item) => (
          <Link to={`/${item.name}/${item.id}`}>
            <div className="card" key={item.id}>
              <div className="left">
                <img src={item.cover} alt="" />
              </div>
              <div className="right">
                <h6>{item.name}</h6>
                <p>{item.items} sản phẩm</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};
