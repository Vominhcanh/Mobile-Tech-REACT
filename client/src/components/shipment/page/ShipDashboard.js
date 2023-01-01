import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { API } from "../../../config";
import logo from "../../assets/images/LOGO-MAIN.png";
import OrderItem from "./../conponents/orderItem";

const ShipDashboard = () => {
  const [order, setOrder] = useState(null);
  const history = useHistory();
  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify());
    history.push("/login");
  };
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API}/orders/all-order/`);
      const data = res.data.order.filter(
        (or) => or?.orderStatus == "Đã xác nhận"
      );
      setOrder(data);
    };
    getData();
  }, []);

  return (
    <div className="container-ship">
      <div className="ship-header">
        <div className="img-ship">
          <img width={70} src={logo} alt="" />
        </div>
        <div className="ship-nav">
          <div>
            <Link to={"/shipment"}>đơn đang chờ</Link>
          </div>
          <div>
            <Link to={"/shipping"}>đơn đang giao</Link>
          </div>
          <div>
            <Link to={"/shiped"}>đơn đã giao</Link>
          </div>
        </div>
        <div className="logout" onClick={() => handleLogout()}>
          <div>Đăng xuất</div>
          <div style={{ marginBottom: "3px" }}>
            <BiLogIn />
          </div>
        </div>
      </div>
      <div className="table-list">
        <div class="header-category">Đơn đang chờ giao</div>
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
              order.map((o) => <OrderItem o={o} />)
            ) : (
              <p>Không có đơn hàng </p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipDashboard;
