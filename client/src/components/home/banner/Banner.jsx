import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { API } from "../../../config";
// import { banner } from "../../assets/data/data"

export const Banner = () => {
  const [bannerData, setBannerData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/banners`);
      setBannerData(data.banner);
    };
    getData();
  }, []);

  return (
    <>
      <section className="banner">
        <div className="posts">
          {bannerData?.map((items) => (
            <div className="post" key={items._id}>
              <div className="content">
                <div className="img">
                  <img src={items.url} alt="" />
                </div>
                <div className="text">
                  {/* <h2>{items.title1}</h2>
                  <h2>{items.title2}</h2>
                  <p>{items.desc}</p> */}
                  <button className="button">SHOP NOW</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
