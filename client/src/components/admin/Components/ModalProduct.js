import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { API } from "../../../config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FileBase64 from "react-file-base64";

const ModalProduct = ({ control, allProduct }) => {
  const { isOpenModal, setIsOpenModal } = control;
  const { product, setProduct } = allProduct;
  const [dataProduct, setDataProduct] = useState({
    name: "",
    desc: "",
    categoryId: "",
    price: "",
    color: ["red", "yellow"],
    cpu: "",
    ram: "",
    storage: "",
    quantity: "",
    img: "",
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

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/products/create-product`,
        dataProduct
      );
      if (res?.status == 200) {
        alert("Thêm thành công");
        setProduct([...product, res.data.producted]);
        setIsOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-modal">
      <div class="modal-content ">
        <div className="cancel-add">
          <span class="close" onClick={() => setIsOpenModal(false)}>
            <GiCancel />
          </span>
        </div>
        <form onSubmit={(e) => handleCreateProduct(e)}>
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
            <div>
              <label className="abc">
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) =>
                    setDataProduct({ ...dataProduct, img: base64 })
                  }
                />
              </label>
            </div>
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
            {/* <input
              type=""
              name=""
              value={dataProduct.desc}
              onChange={(e) =>
                setDataProduct({ ...dataProduct, desc: e.target.value })
              }
            /> */}
            <CKEditor
              editor={ClassicEditor}
              id="header"
              data=""
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
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduct;
