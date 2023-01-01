import React from "react";
import { useEffect, useState } from "react";
import { API } from "../../../config";
import axios from "axios";
import Loading from "./../../home/Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
const UserAccount = () => {
  const [userAccount, setuserAccount] = useState(null);
  const [loading, setloading] = useState(true);
  const showToastDelete = () => {
    toast("Xóa thành công !!!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastSuccess = () => {
    toast.success("Cấp quyền shipper thành công !!!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/users/`);
      console.log(data);
      setuserAccount(data);
      setloading(false);
    };
    getData();
  }, []);
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn xóa?");
    if (!confirmDelete) {
      return;
    }
    try {
      const res = await axios.put(`${API}/users/delete-user/${userId}`);
      console.log(res);
      if (res?.status == 200) {
        showToastDelete();
        // alert("óadasd");
        const temp = userAccount.filter((c) => c._id != userId);
        setuserAccount(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpLever = async (userId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn chọn làm shiper?");
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await axios.put(`${API}/users/uplever-user/${userId}`);
      console.log(res);
      if (res?.status == 200) {
        showToastSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="table-data">
          <div className="order">
            <div class="header-category">Tài khoản khách hàng</div>
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Hình ảnh</th>
                  <th>Tên tài khoản</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {userAccount ? (
                  userAccount.map((us) => (
                    <tr>
                      <td>
                        <img src={us.image} alt="" />
                      </td>
                      <td>{us.username}</td>
                      <td>{us.email}</td>
                      <td>{us.role}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          type=""
                          onClick={() => handleDeleteUser(us._id)}
                        >
                          Xóa
                        </button>
                        <button type="" onClick={() => handleUpLever(us._id)}>
                          Shiper
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>không có tài khoản</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="GeeksforGeeks">
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default UserAccount;
