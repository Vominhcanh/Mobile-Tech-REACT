import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../config";
import Loading from "./../../home/Loading/Loading";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API}/orders/all-order`);
      setOrder(res.data.order);
      setloading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div class="header-category">Danh sách đơn hàng</div>
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
                      {String(o.total).replace(/(.)(?=(\d{3})+$)/g, "$1.")}
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
      )}
    </>
  );
};

export default Order;
