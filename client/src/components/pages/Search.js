import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import { Footer } from "../common/Footer";
import { ProductItems } from "./../home/product/ProductItems";
import { Header } from "./../common/Header";
import { BiSearch } from "react-icons/bi";
import Loading from "./../home/Loading/Loading";

const Search = () => {
  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/products/get-all-product`);
      if (query === "") {
        setloading(false);
        setProducts(data.products);
        return;
      }
      const abc = data.products.filter((p) => {
        const searchkey = query.toLowerCase();
        const title = p.name.toLowerCase();
        return searchkey && title.startsWith(searchkey) && title !== searchkey;
      });
      // console.log(abc);
      setProducts(abc);
    };
    getData();
  }, [query]);
  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="main-product">
          <>
            <div className="search">
              <span>Tìm kiếm </span>
              <hr />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button Change={(e) => setQuery(e.target.value)}>
                <BiSearch className="serachIcon heIcon" />
              </button>
            </div>
          </>
          <div className="product_items">
            {products?.map((p) => (
              <Link to={`/productdetails/${p?._id}`}>
                <div className="box" key={p?._id}>
                  <div className="img">
                    <img src={p?.img} alt="" />
                  </div>
                  <div className="details">
                    <h3>{p?.name.slice(0, 30)}...</h3>
                    <p>
                      {p?.cpu} Ram {p?.ram} GB
                    </p>
                    <h6>
                      Giá:{" "}
                      {String(p?.price).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                      vnđ
                    </h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Search;
