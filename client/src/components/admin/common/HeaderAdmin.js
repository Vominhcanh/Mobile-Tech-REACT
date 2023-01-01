import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  const [userLogged, setUserLogged] = useState(
    JSON?.parse(window.localStorage.getItem("user"))
  );
  return (
    <>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <div>Quản trị viên:</div> */}
        <Link to={"#"} className="profile">
          <img src={userLogged?.user?.image} alt="" />
        </Link>
      </div>
    </>
  );
};

export default HeaderAdmin;
