import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { API } from "../../../config";
import FileBase64 from "react-file-base64";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ModalProductEdit = ({ control, allProduct, product, setProduct }) => {
  const { isOpenModalEdit, setIsOpenModalEdit } = control;
  const { allPr, setAllPr } = allProduct;
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `${API}/products/update-product/${product._id}`,
      { dataProduct }
    );
    if (res?.status == 200) {
      alert("Cập nhật thành công");

      // const dataNew = res.data.product;
      const prductemp = allPr.filter((pr) => pr._id != res?.data?.product?._id);
      setAllPr([...prductemp, res?.data?.product]);

      console.log(prductemp);
      setIsOpenModalEdit(false);
      console.log(prductemp);
    }
  };
  const [dataProduct, setDataProduct] = useState({
    name: product?.name,
    desc: product?.desc,
    categoryId: product?.categoryId,
    price: product?.price,
    color: ["red", "yellow"],
    cpu: product?.cpu,
    ram: product?.ram,
    storage: product?.storage,
    quantity: product?.quantity,
    img: product?.img,
  });

  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/categorys/`);
      console.log(data);
      setCategories(data.categories);
      setDataProduct({ ...dataProduct, categoryId: data.categories[0]._id });
    };
    getData();
  }, []);

  return (
    <div>
      {" "}
      <div className="container-modal">
        <div class="modal-content ">
          <div className="cancel-add">
            <span class="close" onClick={() => setIsOpenModalEdit(false)}>
              <GiCancel />
            </span>
          </div>
          <form onSubmit={(e) => handleUpdateProduct(e)}>
            <div>
              <label for="">Tên sản phẩm</label>
              <input
                type=""
                name=""
                value={dataProduct.name}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, name: e.target.value })
                }
              />
            </div>
            <div>
              <label for="">Hình ảnh</label>
              <FileBase64
                multiple={false}
                onDone={({ base64 }) =>
                  setDataProduct({ ...dataProduct, img: base64 })
                }
              />
            </div>
            <div>
              <label for="">Danh mục</label>
              <select
                value={categories && categories[0]._id}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, categoryId: e.target.value })
                }
              >
                {categories?.map((ca) => (
                  <option value={ca._id}>{ca.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label for="">CPU</label>
              <input
                type=""
                name=""
                value={dataProduct.cpu}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, cpu: e.target.value })
                }
              />
            </div>
            <div>
              <label for="">RAM</label>
              <input
                type=""
                name=""
                value={dataProduct.ram}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, ram: e.target.value })
                }
              />
            </div>
            <div>
              <label for="">Storage</label>
              <input
                type=""
                name=""
                value={dataProduct.storage}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, storage: e.target.value })
                }
              />
            </div>
            <div>
              <label for="">Số lượng</label>
              <input
                type=""
                name=""
                value={dataProduct.quantity}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, quantity: e.target.value })
                }
              />
            </div>
            <div>
              <label for="">Giá</label>
              <input
                type=""
                name=""
                value={dataProduct.price}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, price: e.target.value })
                }
              />
            </div>
            <div>
              <label for="">Chi tiết</label>
              <CKEditor
                editor={ClassicEditor}
                id="header"
                data={product?.desc}
                onReady={(editor) => {
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDataProduct({ ...dataProduct, desc: data });
                }}
              />
            </div>
            <div className="add-product">
              <button className="button-18" type="">
                Cập nhật sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalProductEdit;
