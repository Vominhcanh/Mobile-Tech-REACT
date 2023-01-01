import { React, useEffect, useState } from "react";
import { Header } from "./../../common/Header";
import axios from "axios";
import { API } from "../../../config";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import { GrPrevious } from "react-icons/gr";
const OrderDetails = () => {
  const { id } = useParams();
  const [OrderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/orders/order-detail/${id}`);
      //   console.log(data);
      setOrderDetails(data?.order);
    };
    getData();
  }, [id]);
  console.log(OrderDetails);
  return (
    <>
      <Header />
      <div>
        <Link to={"/order"}>
          <h6 style={{ padding: " 2% 10%" }}>
            <GrPrevious />
            Quay về trang trước
          </h6>
        </Link>
      </div>
      <div className="container-detals">
        <h3>Chi tiết đơn hàng</h3>
        <div className="details-order">
          <div className="infor">
            <div>
              <span>Mã hơn hàng : </span>
              {OrderDetails?._id}
            </div>
            <div>
              <span>Tên đơn hàng : </span>
              {OrderDetails?.name}
            </div>
            <div>
              <span>Địa chỉ : </span>
              {OrderDetails?.address}
            </div>
            <div>
              <span>Số điện thoại : </span>
              {OrderDetails?.sdt}
            </div>
            <div>
              <span>Trạng thái giao hàng : </span>
              {OrderDetails?.orderStatus}
            </div>
            <div>
              <span>Ngày đặt hàng : </span>
              <Moment format="YYYY/MM/DD " date={OrderDetails?.createdAt} /> ||
              Giờ
              <Moment format=" hh:mm:ss" date={OrderDetails?.createdAt} />
            </div>
            <div>
              <span>Người giao hàng : </span>
              {OrderDetails?.shipBy?.name}
            </div>
            <div>
              <span>Trạng thái thanh toán : </span>
              {OrderDetails?.payStatus}
            </div>
            <div>
              <span>Tổng tiền đơn hàng : </span>
              {String(OrderDetails?.total).replace(
                /(.)(?=(\d{3})+$)/g,
                "$1."
              )}{" "}
              vnđ
            </div>
          </div>
          <div className="table-order">
            <table>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th> Số lượng</th>
                </tr>
              </thead>
              {OrderDetails?.product.map((pr) => (
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td> {pr?.product.name.slice(0, 10)}</td>
                    <td>
                      <img width={"70px"} src={pr?.product.img} alt="" />
                    </td>
                    <td> {pr?.quantity}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetails;
