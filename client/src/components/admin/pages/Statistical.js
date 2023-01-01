import React, { useEffect } from "react";
import "../../../style/StylesAdmin/PageAdmin.scss";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Nav from "../common/Nav";
import HeaderAdmin from "../common/HeaderAdmin";
import UserAccount from "../Components/UserAccount";
import axios from "axios";
import { API } from "../../../config";
import Loading from "./../../home/Loading/Loading";

import { Link, useHistory } from "react-router-dom";
const Statistical = () => {
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
  const [tab, setTab] = useState("Đơn hàng chưa xác nhận");
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API}/orders/all-order`);
      const sst =
        tab === "Đơn hàng chưa xác nhận"
          ? "Chờ xác nhận"
          : tab === "Đơn hàng chưa giao"
          ? "Đã xác nhận"
          : tab === "Đơn hàng đang giao"
          ? "Đang giao hàng"
          : tab === "Đơn hàng đã giao"
          ? "Đã giao hàng"
          : null;
      const abc = res.data.order?.filter((o) => o.orderStatus == sst);

      console.log(sst);

      console.log(abc);
      setOrder(abc);
      //   setloading(false);
    };
    getData();
  }, [tab]);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (order) {
      setTotal(order?.reduce((total, item) => total + Number(item.total), 0));
    }
  }, [tab, order]);

  //   console.log(total);

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
        <main>
          <div className="static-admin">
            <h6 onClick={() => setTab("Đơn hàng chưa xác nhận")}>
              Đơn hàng chưa xác nhận
            </h6>
            <h6 onClick={() => setTab("Đơn hàng chưa giao")}>
              Đơn hàng chưa giao
            </h6>
            <h6 onClick={() => setTab("Đơn hàng đang giao")}>
              Đơn hàng đang giao
            </h6>
            <h6 onClick={() => setTab("Đơn hàng đã giao")}>Đơn hàng đã giao</h6>
          </div>

          <div>
            <div className="static-admin-list">
              <h5>
                {tab} || Tổng đơn: {order?.length || 0} || Tổng tiền:
                {String(total).replace(/(.)(?=(\d{3})+$)/g, "$1.")} vnđ
              </h5>
            </div>
            <div class="header-category">Thống kê đơn hàng</div>
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Tên đơn hàng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {order ? (
                  order.map((o) => (
                    <tr>
                      <td>{o.name}</td>
                      <td>
                        {String(o.total).replace(/(.)(?=(\d{3})+$)/g, "$1.")}{" "}
                        vnđ
                      </td>
                      <td>{o.orderStatus}</td>
                      <td>{o.sdt}</td>
                      <td>{o.address}</td>
                      <td>
                        <Link to={`/admin-order-detail/${o._id}`}>
                          <button style={{ marginLeft: "35%" }} type="">
                            Xem chi tiết
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>kh có </p>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </section>
    </>
  );
};

export default Statistical;
