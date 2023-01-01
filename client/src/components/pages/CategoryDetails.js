import React from "react";
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";
import { Home } from "../home/Home";
import MainProduct from "../home/MainProduct";

const CategoryDetail = ({ cartItems }) => {
  return (
    <div>
      <Header />
      <MainProduct />
      <Footer />
    </div>
  );
};

export default CategoryDetail;
