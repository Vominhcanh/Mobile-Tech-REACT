import React, { useEffect } from "react";
import "../../../style/StylesAdmin/PageAdmin.scss";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Nav from "../common/Nav";
import HeaderAdmin from "../common/HeaderAdmin";
import Category from "./../Components/Category";
import Order from "../Components/Order";
import OrderDetails from "../Components/OrderDetails";
import { useHistory } from "react-router-dom";
const OrderDetailAdmin = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  let history = useHistory();

  const [userLogged, setUserLogged] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  console.log(userLogged);

  useEffect(() => {
    if (userLogged?.user?.role != "admin") {
      history.push("/");
    }
  }, [userLogged]);
  return (
    <>
      <section id="sidebar" className={`${isOpenMenu && "hide"}`}>
        <Nav />
      </section>

      <section id="content">
        <nav>
          <div onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <FiMenu size={"25px"} />
          </div>
          <HeaderAdmin />
        </nav>
        <main>{<OrderDetails />}</main>
      </section>
    </>
  );
};

export default OrderDetailAdmin;
