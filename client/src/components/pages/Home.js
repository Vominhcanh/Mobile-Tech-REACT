import React from "react";
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";
import { Home } from "./../home/Home";

const HomePage = ({ cartItems }) => {
  return (
    <div>
      <Header />
      <Home cartItems={cartItems} />
      <Footer />
    </div>
  );
};

export default HomePage;
