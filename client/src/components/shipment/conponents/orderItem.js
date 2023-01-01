import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
const OrderItem = ({ o }) => {
  console.log(o);
  return (
    <>
      <tr>
        <td>{o.name}</td>
        <td>{String(o.total).replace(/(.)(?=(\d{3})+$)/g, "$1,")}</td>
        <td>{o.orderStatus}</td>
        <td>{o.sdt}</td>
        <td>{o.address}</td>

        <td>
          <Link to={`/shipment-details/${o._id}`}>
            <button style={{ marginLeft: "35%" }} type="">
              Xem chi tiết
            </button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default OrderItem;
