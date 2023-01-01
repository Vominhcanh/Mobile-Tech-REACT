import axios from "axios";
import React from "react";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { API } from "../../../config";
import FileBase64 from "react-file-base64";

const ModalCategory = ({ id, state, modal, ca }) => {
  // console.log( );
  const [dataUpadteCategory, setdataUpadteCategory] = useState({
    img: ca?.img,
    name: ca?.name,
  });

  const { categories, setCategories } = state;
  const { openModal, setopenModal } = modal;

  const handleUpdateCategory = async (e, cateId) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${API}/categorys/update-category/${cateId}`,
        {
          img: dataUpadteCategory?.img,
          name: dataUpadteCategory?.name,
        }
      );
      console.log(res);
      if (res?.status == 200) {
        alert("Cập nhật thành công");
        const temp = categories.filter((c) => c._id != cateId);
        setCategories([...temp, res?.data?.categoried]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className={`modal-category modal-category-show${
          openModal ? " " : null
        }`}
      >
        <div className="content-modal">
          <div style={{ textAlign: "end" }} onClick={() => setopenModal(false)}>
            <GiCancel />
          </div>
          <h3>Cập nhật danh mục</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateCategory(e, id);
            }}
          >
            <div>
              <label for="">Tên đanh mục : </label>
              <input
                value={dataUpadteCategory.name}
                onChange={(e) =>
                  setdataUpadteCategory({
                    ...dataUpadteCategory,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label for="">Hình ảnh :</label>
              <FileBase64
                multiple={false}
                onDone={({ base64 }) =>
                  setdataUpadteCategory({ ...dataUpadteCategory, img: base64 })
                }
              />
              <button
                type=""
                onClick={() =>
                  setdataUpadteCategory({
                    ...dataUpadteCategory,
                    img: "",
                  })
                }
              >
                Xóa ảnh
              </button>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setopenModal(false)}>
                Cập nhật danh mục
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCategory;
