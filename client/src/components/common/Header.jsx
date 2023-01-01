import React, { useState } from "react";
import logo from "../assets/images/LOGO-MAIN.png";
import { BsBagCheck } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DELETE } from "../../controller/action";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../../config";

import Dropdown from "react-bootstrap/Dropdown";
export const Header = () => {
  const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  // navbar
  const [categories, setCategories] = useState(null);
  const history = useHistory();

  const [userLogged, setUserLogged] = useState(
    JSON?.parse(window.localStorage.getItem("user"))
  );
  const [mobile, setMobile] = useState(false);
  // cartopen and close
  const [cartList, setCartList] = useState(false);
  // const handleClose = () => {
  //   setCartList(null);
  // };

  // scroll navbar
  // window.addEventListener("scroll", function () {
  //   const header = this.document.querySelector(".header");
  //   header.classList.toggle("active", this.window.scrollY > 200);
  // });
  // cart add in shop
  const getdata = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();
  const delet = (id) => {
    dispatch(DELETE(id));
  };
  // total prcie
  // const [price, setPrice] = useState(0);
  // // console.log(price);
  // const totals = () => {
  //   let price = 0;
  //   getdata.map((e, i) => {
  //     price = parseFloat(e.price) * e.qty + price;
  //   });
  //   setPrice(price);
  // };
  // useEffect(() => {
  //   // totals();
  // }, [totals]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/categorys/`);
      // console.log(data);
      setCategories(data.categories);
    };
    getData();
  }, []);
  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify());
    history.push("/login");
  };

  return (
    <>
      <header className="header active">
        <div className="container">
          <nav>
            <div className="toggle">
              <button onClick={() => setMobile(!mobile)}>
                {mobile ? (
                  <AiOutlineClose className="close heIcon" />
                ) : (
                  <AiOutlineMenu className="open heIcon" />
                )}
              </button>
            </div>
            <div className="left">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="center">
              <ul className={mobile ? "mobile-nav" : "menu"}>
                {categories?.map((nav, i) => (
                  <li key={i}>
                    <Link to={`/${nav._id}`}>{nav.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="right">
            <Link to={"/search"}>
              <div className="search-items-name">
                <FaSearch />
              </div>
            </Link>
            <div className="right_user">
              {userLogged?.user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="  styles-bootrap"
                  >
                    {" "}
                    <FaUserAlt />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {userLogged?.user?.role == "admin" && (
                      <Dropdown.Item>
                        <Link to={"/admin"}>Quản trị hệ thống </Link>
                      </Dropdown.Item>
                    )}
                    {userLogged?.user?.role == "shiper" && (
                      <Dropdown.Item>
                        <Link to={"/shipment"}>Dành cho shiper </Link>
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item>
                      <Link to={"/my-order"}>Đơn Hàng của tôi </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>{userLogged?.user?.name}</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLogout()}>
                      Đăng Xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to={"/login"}>
                  <RiUser3Line className="userIcon heIcon" />
                </Link>
              )}
            </div>
            <div className="right_card">
              <Link to={`/cart`}>
                <button className="button">
                  <BsBagCheck className="shop heIcon" />
                  {/* <span> ({cartItem?.length})</span> */}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    amount: state.amount,
  };
};
connect(mapStateToProps)(Header);
