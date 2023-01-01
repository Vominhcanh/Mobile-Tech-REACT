import React, { useState } from "react";
import { topProducts } from "../../assets/data/data";
import { Heading } from "../../common/Heading";
import { ProductItems } from "../product/ProductItems";

export const TopProduct = () => {
  const [cartItems, setCartItems] = useState(topProducts);
  const allCategories = [
    "all",
    ...new Set(cartItems.map((item) => item.category)),
  ];
  const [category, setCategory] = useState(allCategories);
  const handleFilter = (category) => {
    const newItem = topProducts.filter((item) => item.category === category);
    setCartItems(newItem);

    if (category === "all") {
      setCartItems(topProducts);
      return;
    }
  };
  return (
    <>
      <section className="topproduct">
        <div className="container">
          <div className="head" style={{ textAlign: "center" }}>
            <Heading title="Sản phẩm bán chạy nhất" />
            <div className="category">
              {category.map((category) => (
                <button
                  className="button"
                  onClick={() => handleFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  );
};
