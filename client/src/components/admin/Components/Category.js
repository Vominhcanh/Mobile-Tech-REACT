import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "../../../style/StylesAdmin/StyleCategory.scss";
import axios from "axios";
import { API } from "../../../config";
import ModalCategory from "./ModalCategory";
import FileBase64 from "react-file-base64";
import Loading from "./../../home/Loading/Loading";
const Category = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setloading] = useState(true);
  const [openModal, setopenModal] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/categorys/`);
      console.log(data);
      setCategories(data.categories);
      setloading(false);
    };
    getData();
  }, []);

  const [dataCategory, setDataCategory] = useState({
    name: "",
    img: "",
  });
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/categorys/create-category`,
        dataCategory
      );
      //   console.log(res);
      if (res?.status == 200) {
        alert("Thêm thành công");
        setCategories([...categories, res.data.categoried]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (cateId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn xóa?");
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await axios.put(`${API}/categorys/delete-category/${cateId}`);
      console.log(res);
      if (res?.status == 200) {
        alert("Xóa thành công");
        const temp = categories.filter((c) => c._id != cateId);
        setCategories(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add-category">
        <form onSubmit={(e) => handleCreateCategory(e)}>
          <label for="">Tên danh mục</label>
          <input
            type="text"
            name=""
            value={dataCategory.name}
            onChange={(e) =>
              setDataCategory({ ...dataCategory, name: e.target.value })
            }
          />
          <label for="">Hình ảnh</label>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) =>
              setDataCategory({ ...dataCategory, img: base64 })
            }
          />
          <button type="">Thêm</button>
        </form>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div class="table-users p-2">
          <div class="header-category">Danh mục sản phẩm</div>
          <table cellspacing="0">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th width="230">Chọn</th>
              </tr>
            </thead>
            <tbody>
              {categories ? (
                categories.map((ca) => (
                  <>
                    <tr>
                      <td>
                        <img src={ca?.img} alt="" />
                      </td>
                      <td>{ca?.name}</td>
                      <td>
                        <button
                          type=""
                          onClick={() => handleDeleteCategory(ca._id)}
                        >
                          Xóa
                        </button>
                        <button
                          onClick={() => {
                            setopenModal(!openModal);
                          }}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                    {openModal && (
                      <ModalCategory
                        ca={ca}
                        id={ca?._id}
                        state={{
                          categories,
                          setCategories,
                        }}
                        // ca={/ca}
                        modal={{ openModal, setopenModal }}
                      />
                    )}
                  </>
                ))
              ) : (
                <p>k co sp</p>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Category;
