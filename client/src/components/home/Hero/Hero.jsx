import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { products, slide } from "../../assets/data/data";
import { SearchItems } from "./SearchItems";
import Carousel from "react-bootstrap/Carousel";
import { API } from "../../../config";
import axios from "axios";

export const Hero = () => {
  const [bannerData, setBannerData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/banners`);
      setBannerData(data.banner);
    };
    getData();
  }, []);
  // search
  const [value, setValue] = useState("");
  const onChanage = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (key) => {
    setValue(key);
    console.log("search", key);
  };
  return (
    <>
      <section className="hero">
        <div className="container">
          <Carousel style={{ width: "100%" }}>
            {bannerData?.map((item) => (
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={item.url}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* <div className="search">
            <span>Tìm kiếm </span>
            <hr />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onChange={onChanage}
              value={value}
            />
            <button onClick={() => onSearch(value)}>
              <BiSearch className="serachIcon heIcon" />
            </button>
          </div> */}
          <SearchItems products={products} value={value} onSearch={onSearch} />
        </div>
      </section>
    </>
  );
};
