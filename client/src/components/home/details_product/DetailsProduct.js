import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config";
import { useState } from "react";
import parse from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";

const DetailsProduct = () => {
  const [userLogged, setUserLogged] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  console.log(userLogged);
  const { id } = useParams();
  const showToastAdd = () => {
    toast("Thêm thành công !!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/products/get-all-product`);
      const pr = data.products?.filter((p) => p._id === id);
      // console.log(pr);
      setProduct(pr);
    };

    getData();
  }, [id]);
  const handleAddToCart = async () => {
    try {
      var cartStorage = JSON.parse(localStorage.getItem("cart"));
      let CartTemp = [];
      showToastAdd();
      // alert("oke");
      // console.log("-------");
      // console.log(cartStorage);
      // cartStorage.push({ product: product[0], quantity: 1 });
      if (cartStorage) {
        if (cartStorage[0]) {
          const checkInCart = cartStorage.find(
            (pr) => pr.product._id == product[0]._id
          );
          console.log("check in cart");
          console.log(checkInCart);
          if (checkInCart) {
            for (let index = 0; index < cartStorage.length; index++) {
              if (cartStorage[index].product._id == product[0]._id) {
                console.log(cartStorage);

                CartTemp.push({
                  product: product[0],
                  quantity: (cartStorage[index].quantity += 1),
                });
              } else {
                console.log("k");
                console.log(cartStorage[index]);
                CartTemp.push(cartStorage[index]);
              }
            }
          } else {
            CartTemp = cartStorage;
            console.log(cartStorage);

            CartTemp.push({
              product: product[0],
              quantity: 1,
            });
          }
        } else {
          CartTemp.push({
            product: product[0],
            quantity: 1,
          });
        }
      } else {
        CartTemp.push({
          product: product[0],
          quantity: 1,
        });
      }
      console.log(CartTemp);

      localStorage.setItem("cart", JSON.stringify(CartTemp));
    } catch (error) {
      console.log(error);
    }
  };

  // const data = products?.find((i) => i.id == id);
  return (
    product && (
      <>
        <div className="container_product-detail ">
          <section className="product">
            <div className="product__photo">
              <div className="photo-container">
                <div className="photo-main">
                  <div className="controls"></div>
                  <img src={product[0]?.img} alt="green apple slice" />
                </div>
              </div>
            </div>
            <div className="product__info">
              <div className="title">
                <h2>{product[0]?.name}</h2>
              </div>
              <div className="price">
                Giá tiền:
                <span>
                  {String(product[0]?.price).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1."
                  )}{" "}
                  vnđ
                </span>
              </div>
              <div className="description">
                <h4>Chi tiết sản phẩm</h4>
                <ul>
                  <li>
                    <p>Chip xử lý (CPU) : {product[0]?.cpu} </p>
                  </li>
                  <li>
                    <p>Bộ nhớ (RAM) : {product[0]?.ram} GB</p>
                  </li>
                  <li>
                    <p>Dung lượng lưu trữ (ROM) : {product[0]?.storage} GB</p>
                  </li>
                </ul>
              </div>
              <button className="buy--btn" onClick={() => handleAddToCart()}>
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </section>
          <div className="product-desc">
            <h2> Mô tả sản phẩm</h2>
            <div style={{ width: "100%" }}>{parse(product[0]?.desc)}</div>
          </div>
        </div>
        <div className="GeeksforGeeks">
          <ToastContainer autoClose={1000} />
        </div>
      </>
    )
  );
};

export default DetailsProduct;
