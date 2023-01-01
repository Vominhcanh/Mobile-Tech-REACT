import React from "react";
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";
import DetailsProduct from "../home/details_product/DetailsProduct";

const ProductDetails = ({ cartItems }) => {
  return (
    <div>
      <Header />
      <DetailsProduct />
      <Footer />
    </div>
  );
};

export default ProductDetails;
