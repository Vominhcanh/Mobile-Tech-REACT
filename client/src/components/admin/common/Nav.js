import React from "react";
import logo from "../../assets/images/LOGO-MAIN.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
const Nav = () => {
  return (
    <>
      <Link to={"/"} className="brand">
        <img width={"55px"} src={logo} alt="logo" />
        <span className="text">Mobile Tech</span>
      </Link>
      <ul className="side-menu top">
        <li className="active">
          <Link to={"/admin"}>
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin-category"}>
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="text">Danh mục</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin-product"}>
            <i className="bx bxs-doughnut-chart"></i>
            <span className="text">Sản Phẩm</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin-banner"}>
            <i className="bx bxs-doughnut-chart"></i>
            <span className="text">Banner</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin-accounts"}>
            <i className="bx bxs-message-dots"></i>
            <span className="text">Tài khoản</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin-order"}>
            <i className="bx bxs-group"></i>
            <span className="text">Đơn hàng</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin-statis"}>
            <i className="bx bxs-group"></i>
            <span className="text">Thống kê</span>
          </Link>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <Link to={"#"} className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;
