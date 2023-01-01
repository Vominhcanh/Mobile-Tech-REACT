import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../config";
import { Header } from "./../common/Header";
import { Link } from "react-router-dom";

const Order = () => {
  const [userLogged, setUserLogged] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API}/orders/${userLogged?.user?._id}`);
      setOrder(res.data.order);
    };
    getData();
  }, []);

  console.log(order);
  return (
    <div>
      <Header />
      <div className="my-5 mx-5">
        <div className="table-data">
          <div className="order">
            <div class="header-category"> Đơn hàng của tôi </div>
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
                        {String(o.total).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                      </td>

                      <td>{o.orderStatus}</td>
                      <td>{o.sdt}</td>
                      <td>{o.address}</td>

                      <td>
                        <Link to={`/orderdetails/${o._id}`}>
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
        </div>
      </div>
    </div>
  );
};

export default Order;
