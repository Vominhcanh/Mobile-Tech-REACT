/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Header } from "./../common/Header";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrLinkPrevious } from "react-icons/gr";
import { MdOutlineRemove, MdAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const [userLogged, setUserLogged] = useState(
    JSON?.parse(window.localStorage.getItem("user"))
  );
  const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  console.log(cartItem);

  // let temple = 0;

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
    }
  }, [cartItem]);

  const handleUpQuantity = (index) => {
    // console.log(cartItem);
    // console.log(index);
    // console.log(temple);
    // temple = cartItem[index].quantity + 1;
    cartItem[index].quantity = cartItem[index].quantity + 1;
    // console.log(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartItem));
    setCartItem(JSON.parse(localStorage.getItem("cart")));
  };
  const handleDownQuantity = (index) => {
    // console.log(cartItem);
    // console.log(index);
    // console.log(temple);
    // temple = cartItem[index].quantity + 1;
    if (cartItem[index].quantity == 1) {
      alert("Số lượng k dc nhỏ hơn 1");
      return;
    }
    cartItem[index].quantity = cartItem[index].quantity - 1;
    // console.log(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartItem));
    setCartItem(JSON.parse(localStorage.getItem("cart")));
  };
  const handleRemove = (index) => {
    // console.log(cartItem);
    // console.log(index);
    // console.log(temple);
    // temple = cartItem[index].quantity + 1;
    cartItem.splice(index, 1);
    // cartItem[index].quantity = cartItem[index].quantity - 1;
    // console.log(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartItem));
    setCartItem(JSON.parse(localStorage.getItem("cart")));
  };

  const history = useHistory();

  const handlePay = async () => {
    if (userLogged?.user) {
      history.push("/pay");
    } else {
      history.push("/login");
    }
  };
  return (
    <>
      <Header />
      <section className="h-100 h-custom" style={{ background: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="">
                      <h5 className="mb-3">
                        <Link to={"/"} className="text-body">
                          <GrLinkPrevious />
                          <span>Tiếp tục mua hàng</span>
                        </Link>
                      </h5>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping Cart</p>
                          <p className="mb-0">
                            Hiện đang có {cartItem?.length || 0} sản phẩm
                          </p>
                        </div>
                      </div>
                      <div className="card px-3 py-3 rounded-3 ">
                        {cartItem
                          ? cartItem?.map((pr, index) => (
                              <div className="card mb-3 ">
                                <div className="card-body">
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                      <div className="mx-4">
                                        <img
                                          src={pr.product.img}
                                          className="img-fluid rounded-3"
                                          alt="Shopping item"
                                          style={{ width: "75px" }}
                                        />
                                      </div>
                                      <div className="ms-3">
                                        <h5>{pr.product.name}</h5>
                                        <p className="small mb-0">
                                          Chip xử lý (CPU): {pr.product.cpu}
                                        </p>
                                        <p className="small mb-0">
                                          Bộ nhớ trong (RAM): {pr.product.ram}
                                          GB
                                        </p>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div style={{ width: "110px" }}>
                                        <h5 className="fw-normal mb-0 ">
                                          <span
                                            onClick={() =>
                                              handleDownQuantity(index)
                                            }
                                          >
                                            <MdOutlineRemove className="mx-2" />
                                          </span>
                                          {pr.quantity}
                                          <span
                                            onClick={() =>
                                              handleUpQuantity(index)
                                            }
                                          >
                                            {" "}
                                            <MdAdd className="mx-2" />
                                          </span>
                                        </h5>
                                      </div>
                                      <div style={{ width: "200px" }}>
                                        <h5 className="mb-0 ">
                                          {String(pr.product.price).replace(
                                            /(.)(?=(\d{3})+$)/g,
                                            "$1,"
                                          )}{" "}
                                          vnđ
                                        </h5>
                                      </div>
                                      <div>
                                        <a
                                          href="#"
                                          style={{ color: "#757575" }}
                                          onClick={() => handleRemove(index)}
                                        >
                                          <RiDeleteBin6Line color={"red"} />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : "k co"}
                        Tổng cộng:
                        {String(total).replace(/(.)(?=(\d{3})+$)/g, "$1,")} Vnđ
                      </div>
                    </div>
                    <p
                      onClick={() => {
                        handlePay();
                      }}
                      className=""
                    >
                      <div className="Link-pay">
                        <span>Thanh toán</span>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
