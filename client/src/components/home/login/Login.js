import React, { useState } from "react";
import { API } from "../../../config";
import axios from "axios";
import logo from "../../assets/images/LOGO-MAIN.png";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
  const showToastMessageSuccess = (suces) => {
    toast.success(suces, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageErros = (er) => {
    toast.error(er, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  let history = useHistory();
  const [state, setstate] = useState(false);
  const [dataRegister, setDataRegister] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [dataLogin, setDataLogin] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmitRegiter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/users/register`, dataRegister);
      console.log(res);
      if (res.status == 200) {
        showToastMessageSuccess("Đăng ký thành công!! ");
        setDataRegister({
          email: "",
          username: "",
          password: "",
        });
      } else {
        console.log("lỗi");
      }
    } catch (error) {
      showToastMessageErros(error.response.data.msg);
      // alert();
    }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/users/login`, dataLogin);
      console.log(res);
      if (res.status == 200) {
        showToastMessageSuccess("Đăng Nhập thành công !!!");
        setDataLogin({
          email: "",
          password: "",
        });

        console.log(res?.data?.user?.role);
        if (res?.data?.user?.role == "shiper") {
          localStorage.setItem("user", JSON.stringify(res.data));

          history.push("/shipment");
          return;
        }
        localStorage.setItem("user", JSON.stringify(res.data));
        history.push("/");
      } else {
        console.log("lỗi");
      }
    } catch (error) {
      showToastMessageErros(error.response.data.msg);
    }
  };
  return (
    <>
      <div>
        <ToastContainer autoClose={1000} />
      </div>
      <div className="container-login">
        <div
          class={`container ${state ? " right-panel-active" : ""}`}
          id="container"
        >
          <div class="form-container sign-up-container">
            <form action="#" onSubmit={(e) => handleSubmitRegiter(e)}>
              <h2>
                <img width={50} src={logo} alt="" /> Đăng Ký Tài Khoản
              </h2>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, email: e.target.value })
                }
                value={dataRegister.email}
              />
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, username: e.target.value })
                }
                value={dataRegister.username}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, password: e.target.value })
                }
                value={dataRegister.password}
              />
              <button className="">ĐĂNG KÝ</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form action="#" onSubmit={(e) => handleSubmitLogin(e)}>
              <h2>
                {" "}
                <img width={50} src={logo} alt="" />
                Đăng Nhập Tài Khoản
              </h2>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setDataLogin({ ...dataLogin, email: e.target.value })
                }
                value={dataLogin.email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setDataLogin({ ...dataLogin, password: e.target.value })
                }
                value={dataLogin.password}
              />
              {/* <a href="#">Forgot your password?</a> */}
              <button>Đăng nhập</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h2>
                  {" "}
                  <img width={50} src={logo} alt="" />
                  Đăng Nhập Tài Khoản!
                </h2>
                <p>Nếu bạn đã có tài khoản, tiến hành đăng nhập!!</p>
                <button onClick={() => setstate(!state)}>Đăng nhập</button>
              </div>
              <div class="overlay-panel overlay-right">
                <h2>
                  {" "}
                  <img width={50} src={logo} alt="" />
                  Đăng Ký Tài Khoản
                </h2>
                <p>Nếu bạn chưa có tài khoản vui lòng tạo tài khoản</p>
                <button onClick={() => setstate(!state)}>Đăng ký</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
