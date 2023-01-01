import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../config";
import Moment from "react-moment";
import { GrFormPreviousLink, GrPrevious } from "react-icons/gr";

const ShipmentDetail = () => {
  const [userLogged, setUserLogged] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const { id } = useParams();
  const [ShipDetails, setShipDetails] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/orders/order-detail/${id}`);
      console.log(data);
      setShipDetails(data?.order);
    };
    getData();
  }, [id]);
  const handleChangeStatusOrder = async (status) => {
    let payStatus;
    if (status === "Đã giao hàng") {
      payStatus = "Đã thanh toán";
    }
    const { data } = await axios.put(
      `${API}/orders/change-status-order/${id}`,
      { status, shipBy: userLogged?.user?._id, payStatus }
    );
    const newStatus = data?.order?.orderStatus;
    const newStatusPay = data?.order?.payStatus;
    setShipDetails({
      ...ShipDetails,
      orderStatus: newStatus,
      payStatus: newStatusPay,
    });
    console.log(data);
  };
  return (
    <>
      <div>
        <Link to={"/shipment"}>
          <h6 style={{ padding: " 0 10%" }}>
            <GrPrevious />
            Quay về trang trước
          </h6>
        </Link>
      </div>
      <div>
        <div className="container-detals">
          <h3>Chi tiết đơn hàng</h3>
          <div className="details-order">
            <div className="infor">
              <div>
                <span>Mã hơn hàng : </span>
                {ShipDetails?._id}
              </div>
              <div>
                <span>Tên đơn hàng : </span>
                {ShipDetails?.name}
              </div>
              <div>
                <span>Địa chỉ : </span>
                {ShipDetails?.address}
              </div>
              <div>
                <span>Số điện thoại : </span>
                {ShipDetails?.sdt}
              </div>
              <div>
                <span>Ngày đặt hàng : </span>
                <Moment format="YYYY/MM/DD " date={ShipDetails?.createdAt} /> ||
                Giờ
                <Moment format=" hh:mm:ss" date={ShipDetails?.createdAt} />
              </div>
              {ShipDetails?.orderStatus == "Đã giao hàng" && (
                <div>
                  <span>Đã giao ngày : </span>
                  <Moment
                    format="YYYY/MM/DD "
                    date={ShipDetails?.updatedAt}
                  />{" "}
                  || Giờ
                  <Moment format=" hh:mm:ss" date={ShipDetails?.updatedAt} />
                </div>
              )}
              <div>
                <h6>
                  <span>Trạng thái : </span>
                  <span>{ShipDetails?.orderStatus}</span>
                </h6>
              </div>
              <div>
                <h6>
                  <span>Trạng thái thanh toán: </span>
                  <span>{ShipDetails?.payStatus}</span>
                </h6>
              </div>
              <div className="">
                {ShipDetails?.orderStatus == "Đã xác nhận" ? (
                  <button
                    type=""
                    className="btn btn-warning"
                    onClick={() => handleChangeStatusOrder("Đang giao hàng")}
                  >
                    Nhận đơn và giao hàng
                  </button>
                ) : ShipDetails?.orderStatus == "Đang giao hàng" ? (
                  <>
                    <button
                      type=""
                      className=" mx-2 btn btn-dark"
                      onClick={() => handleChangeStatusOrder("Đã giao hàng")}
                    >
                      Đã giao hàng
                    </button>
                  </>
                ) : null}
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
                {ShipDetails?.product.map((pr) => (
                  <tbody>
                    <tr>
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
      </div>
    </>
  );
};
export default ShipmentDetail;
