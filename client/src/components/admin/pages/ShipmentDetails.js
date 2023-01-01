import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API } from "../../../config";
import ShipmentDetail from "./../Components/ShipmentDetail";

const ShipmentDetails = () => {
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
  return (
    <>
      <ShipmentDetail />
    </>
  );
};

export default ShipmentDetails;
