import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config";
import { navlist, products } from "../assets/data/data";
import Loading from "./Loading/Loading";
const MainProduct = () => {
  const { id } = useParams();
  const [currentCate, setCurrentCate] = useState(null);
  const [currentProductsOfCate, setCurrentProductsOfCate] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/categorys/${id}`);
      // console.log(data);
      setCurrentCate(data.cate);
    };

    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${API}/products/get-all-product-with-cate/${id}`
      );
      // console.log(data);
      setCurrentProductsOfCate(data.product);
      setloading(false);
    };
    getData();
  }, [currentCate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="main-product">
          <h2>{currentCate?.name}</h2>
          <div className="product_items">
            {currentProductsOfCate?.map((items) => (
              <Link to={`/productdetails/${items._id}`}>
                <div className="box" key={items._id}>
                  <div className="img">
                    <img src={items.img} alt="" />
                  </div>
                  <div className="details">
                    <h3>{items.name.slice(0, 20)}...</h3>
                    <p>
                      {items.cpu} Ram {items.ram} GB
                    </p>
                    <h6>
                      Giá:{" "}
                      {String(items.price).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                      vnđ
                    </h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default MainProduct;
