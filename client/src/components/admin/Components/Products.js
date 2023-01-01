/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../../../config";
import "../../../style/StylesAdmin/PageProduct.scss";
import ModalProduct from "./ModalProduct";
import ModalProductEdit from "./ModalProductEdit";
import ProductItem from "./ProductItem";
import Loading from "./../../home/Loading/Loading";

const Products = () => {
  const [product, setProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/products/get-all-product`);
      setProduct(data.products);
      setloading(false);
    };
    getData();
  }, []);
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn xóa?");
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await axios.put(
        `${API}/products/delete-product/${productId}`
      );
      console.log(res);
      if (res?.status == 200) {
        alert("Xóa thành công");
        const temp = product.filter((c) => c._id != productId);
        setProduct(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div>
          <button
            className="button-75"
            role="button"
            onClick={() => setIsOpenModal(!isOpenModal)}
            type=""
          >
            <span class="text">Thêm sản phẩm</span>
          </button>
          {isOpenModal && (
            <ModalProduct
              control={{ isOpenModal, setIsOpenModal }}
              allProduct={{ product, setProduct }}
            />
          )}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div class="table-users p-2">
            <div class="header-category"> Tất cả sản phẩm</div>
            <table cellspacing="0">
              <thead style={{ textAlign: "center", fontWeight: "bold" }}>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th>Chọn</th>
                </tr>
              </thead>

              <tbody>
                {product ? (
                  product?.map((pr) => (
                    <ProductItem
                      data={{ pr, handleDeleteProduct, product, setProduct }}
                    />
                  ))
                ) : (
                  <p>không có sản phẩm</p>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
