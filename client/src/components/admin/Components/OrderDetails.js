import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../../config";
import Shiped from "./../../shipment/page/Shiped";
import Moment from "react-moment";
import { AiOutlineReload } from "react-icons/ai";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import DowLoad from "./../../EXpdf/DowLoad";

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

  const handleChangeStatusOrder = async (status) => {
    const { data } = await axios.put(
      `${API}/orders/change-status-order/${id}`,
      { status }
    );
    const newStatus = data?.order?.orderStatus;
    setOrderDetails({ ...OrderDetails, orderStatus: newStatus });
    // console.log(data);
  };

  return (
    <div>
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
              <span>Ngày đặt hàng : </span>
              <Moment
                format="DD/MM/YYYY hh:mm"
                date={OrderDetails?.createdAt}
              />
            </div>
            {OrderDetails?.orderStatus == "Đã giao hàng" && (
              <div>
                <span>Đã giao ngày : </span>
                <Moment
                  format="DD/MM/YYYY hh:mm"
                  date={OrderDetails?.updatedAt}
                />
              </div>
            )}
            <div>
              <div>
                <span>Người giao hàng : </span>
                {OrderDetails?.shipBy?.name}
              </div>
              <div>
                <h6>
                  Trạng thái : {OrderDetails?.orderStatus}
                  {OrderDetails?.orderStatus === "Chờ xác nhận" ? (
                    <AiOutlineReload color={"#1E90FF"} />
                  ) : OrderDetails?.orderStatus === "Đã xác nhận" ? (
                    <MdOutlineFileDownloadDone color={"#228B22"} />
                  ) : OrderDetails?.orderStatus === "Đang giao hàng" ? (
                    <FiTruck color={"#FFEBCD"} />
                  ) : OrderDetails?.orderStatus === "Đã giao hàng" ? (
                    <MdOutlineFileDownloadDone color={"#008000"} />
                  ) : (
                    <FcCancel />
                  )}
                </h6>
              </div>
            </div>
            <div>
              <h6>
                <span>Trạng thái thanh toán: </span>
                <span>{OrderDetails?.payStatus}</span>
              </h6>
              <h6>
                <span>Tổng tiền đơn hàng : </span>
                {String(OrderDetails?.total).replace(
                  /(.)(?=(\d{3})+$)/g,
                  "$1."
                )}
                vnđ
              </h6>
            </div>
            {OrderDetails?.orderStatus === "Chờ xác nhận" ? (
              <div className="">
                <button
                  type=""
                  className="btn btn-warning"
                  onClick={() => handleChangeStatusOrder("Đã xác nhận")}
                >
                  Xác nhận đơn hàng
                </button>
                <button
                  type=""
                  className="btn btn-dark mx-3 my-3"
                  onClick={() => handleChangeStatusOrder("Hủy đơn")}
                >
                  Hủy đơn
                </button>
              </div>
            ) : null}
            <DowLoad Dowloads={OrderDetails}></DowLoad>
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
  );
};

export default OrderDetails;
