import React from "react";
import { Blog } from "./blog/Blog";
// import { Card } from "./Hero/Card";
import { Hero } from "./Hero/Hero";
import { Product } from "./product/Product";
import { Testimonial } from "./testimonial/Testimonial";
// import { TopProduct } from "./top/TopProduct";
export const Home = () => {
  return (
    <>
      <Hero />
      <Product />
      {/* <TopProduct /> */}
      <Testimonial />
      <Blog />
    </>
  );
};
