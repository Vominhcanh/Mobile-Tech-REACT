import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { API } from "../../../config";
import HeaderAdmin from "../common/HeaderAdmin";
import Nav from "../common/Nav";
import { ToastContainer, toast } from "react-toastify";
import FileBase64 from "react-file-base64";
import Loading from "./../../home/Loading/Loading";
import { useHistory } from "react-router-dom";
const BannerAdmin = () => {
  const showToastMessage = (b) => {
    toast.success(b, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastErr = (err) => {
    toast.success(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastDelete = () => {
    toast("Xóa thành công !!!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [banner, setBanner] = useState(null);
  const [loading, setloading] = useState(true);
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/banners`);
      setBannerData(data.banner);
      setloading(false);
    };
    getData();
  }, []);
  let history = useHistory();

  const [userLogged, setUserLogged] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  console.log(userLogged);

  useEffect(() => {
    if (userLogged?.user?.role != "admin") {
      history.push("/");
    }
  }, [userLogged]);

  const handleAddBanner = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/banners/create-banner`, {
        url: banner,
      });
      console.log(res);
      if (res.status == 200) {
        showToastMessage(res.data.banner);
        const b = res.data.banner;
        setBannerData([...bannerData, b]);
      }
    } catch (error) {
      console.log(error);
      showToastErr(error);
    }
  };
  const handleDeleteUser = async (bannerId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn xóa ?");
    if (!confirmDelete) {
      return;
    }

    try {
      const res = await axios.put(`${API}/banners/delete-banner/${bannerId}`);
      console.log(res);
      if (res?.status == 200) {
        showToastDelete();
        const temp = bannerData.filter((c) => c._id != bannerId);
        setBannerData(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(bannerData);
  return (
    <>
      <section id="sidebar" className={`${isOpenMenu && "hide"}`}>
        <Nav />
      </section>

      <section id="content">
        <nav>
          <div onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <FiMenu size={"25px"} />
          </div>
          <HeaderAdmin />
        </nav>
        <main>
          <div>
            <div className="banner-admin">
              <h5>Thêm banner</h5>
              <form onSubmit={(e) => handleAddBanner(e)}>
                {/* <input type="" onChange={(e) => setBanner(e.target.value)} /> */}
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setBanner(base64)}
                />
                <button>Thêm</button>
              </form>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className="mx-5 p-5">
                <div class="header-category">banner page</div>
                <table cellspacing="0">
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>Hình ảnh</th>
                      <th>Chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerData ? (
                      bannerData?.map((br) => (
                        <tr>
                          <td>
                            <img width={"200px"} src={br?.url} alt="" />
                          </td>

                          <td style={{ textAlign: "center" }}>
                            <button
                              type=""
                              onClick={() => handleDeleteUser(br._id)}
                            >
                              Xóa
                            </button>
                            {/* <button className="" type="">
                              Sửa
                            </button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>k co sp</p>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="GeeksforGeeks">
            <ToastContainer autoClose={1000} />
          </div>
        </main>
      </section>
    </>
  );
};

export default BannerAdmin;
