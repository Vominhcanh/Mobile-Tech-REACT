import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../../config";
import { products } from "../../assets/data/data";
import { Heading } from "../../common/Heading";
import { ProductItems } from "./ProductItems";
import Loading from "./../Loading/Loading";

export const Product = () => {
  const [cartItems, setCartItems] = useState(products);
  const [product, setProduct] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${API}/products/get-all-product`);
      setProduct(data.products);
      setloading(false);
    };
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="product">
          <div className="container">
            <Heading title="Sản phẩm mới nhất" />
            <ProductItems cartItems={cartItems} product={product} />
          </div>
        </section>
      )}
    </>
  );
};
