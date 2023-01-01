import React, { useState } from "react";
import ModalProductEdit from "./ModalProductEdit";

const ProductItem = ({ data }) => {
  const { pr, handleDeleteProduct, product, setProduct } = data;

  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  return (
    <>
      <tr key={pr._id}>
        <td>
          <img src={pr?.img} alt="" />
        </td>
        <td>{pr?.name}</td>
        <td>{pr?.categoryId?.name}</td>
        <td>{String(pr?.price).replace(/(.)(?=(\d{3})+$)/g, "$1.")}</td>
        <td>
          <button type="" onClick={() => handleDeleteProduct(pr._id)}>
            Xóa
          </button>
          <button
            className=""
            type=""
            onClick={() => setIsOpenModalEdit(!isOpenModalEdit)}
          >
            Sửa
          </button>
        </td>
      </tr>
      {isOpenModalEdit && (
        <ModalProductEdit
          control={{ isOpenModalEdit, setIsOpenModalEdit }}
          allProduct={{ allPr: product, setAllPr: setProduct }}
          product={pr}
          setProduct
        />
      )}
    </>
  );
};

export default ProductItem;
