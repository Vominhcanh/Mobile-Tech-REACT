import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../config";
import logo from "../assets/images/LOGO-MAIN.png";
import { Elements } from "@stripe/react-stripe-js";

import { Header } from "./../common/Header";
import { useHistory } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./../home/CheckoutForm";

const Pay = () => {
  const history = useHistory();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(API + "/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [userLogged, setUserLogged] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (cartItem) {
      setTotal(
        cartItem?.reduce(
          (total, item) =>
            total + Number(item.quantity) * Number(item.product.price),
          0
        )
      );

      setOrderInfo({
        ...orderInfo,
        total: cartItem?.reduce(
          (total, item) =>
            total + Number(item.quantity) * Number(item.product.price),
          0
        ),
      });
    }
  }, [cartItem]);

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    product: cartItem,
    sdt: "",
    address: "",
    userId: userLogged?.user?._id,
    total: total,
  });

  useEffect(() => {
    fetch(API + "/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ amount: 3000 }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });

    // const abc = async () => {
    //   const { clientSecret } = await axios.post(
    //     `${API}/create-payment-intent`,
    //     {
    //       amount: 2000,
    //     }
    //   );

    //   console.log(clientSecret);
    //   // setClientSecret(clientSecret);
    // };
    // abc();
  }, []);
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/orders/create-order`, orderInfo);

      console.log(res);

      localStorage.setItem("cart", JSON.stringify([]));
      history.push("/order");
    } catch (error) {}
  };

  // console.log(".................");
  // console.log(stripePromise);
  // console.log(clientSecret);

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-between my-4 mx-5">
        <div className="col-lg-7">
          <table className="border rounded">
            <tr>
              <td>Stt</td>
              <td>Tên sản phẩm</td>
              <td>Hình ảnh</td>
              <td>Số lượng</td>
            </tr>
            {cartItem
              ? cartItem?.map((pr, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{pr.product.name}</td>
                    <td>
                      <img width={"100px"} src={pr.product.img} alt="" />
                    </td>
                    <td>{pr.quantity}</td>
                  </tr>
                ))
              : "k co"}
          </table>
        </div>

        <div className="col-lg-5">
          <div className="card text-white rounded-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 text-dark">Thông tin thanh toán</h4>
                <img
                  className="img-fluid rounded-3"
                  src={logo}
                  style={{ width: "50px" }}
                  alt="Avatar"
                />
              </div>
              <form className="mt-4" onSubmit={(e) => handleCreateOrder(e)}>
                <div className="form-outline form-white mb-4">
                  <label className="form-label text-dark" for="typeName">
                    Tên khách hàng
                  </label>
                  <input
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, name: e.target.value })
                    }
                    type="text"
                    id="typeName"
                    className="form-control form-control-lg"
                  />
                </div>
                <label className="form-label text-dark" for="typeText">
                  Địa chỉ
                </label>
                <div className="form-outline form-white mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, address: e.target.value })
                    }
                  />
                </div>
                <label className="form-label text-dark" for="typeText">
                  Số điện thoại
                </label>
                <div className="form-outline form-white mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, sdt: e.target.value })
                    }
                  />
                </div>
                <hr className="my-4" />
                <p></p>
                <button className="button-order-main">
                  <div className="d-flex justify-content-between">
                    <span>
                      Giá: {String(total).replace(/(.)(?=(\d{3})+$)/g, "$1.")}{" "}
                      vnđ
                    </span>
                    <span>Xác nhận</span>
                  </div>
                </button>
              </form>
              <div style={{ marginTop: "20px" }}>
                {clientSecret && stripePromise && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm currentOrder={orderInfo} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
