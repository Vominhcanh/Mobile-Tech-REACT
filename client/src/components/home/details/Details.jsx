import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action";
import Loading from "./../Loading/Loading";
export const Details = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const getdata = useSelector((state) => state.cartReducer.carts);
  const [loading, setloading] = useState(true);
  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
    setloading(false);
  };
  useEffect(() => {
    compare();
  }, [id]);
  // delete item
  const history = useHistory();
  const deletes = (id) => {
    dispatch(DELETE(id));
    history.push("/");
  };
  // increment item
  const dispatch = useDispatch();
  const increment = (e) => {
    dispatch(ADD(e));
  };

  // descriment item
  const decrement = (item) => {
    dispatch(REMOVE_INT(item));
  };
  // console.log(getdata);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <article>
          <section className="details">
            <h4 className="details_title">TRANG CHI TIẾT SẢN PHẨM</h4>
            {data.map((item) => (
              <div className="details_content">
                <div className="details_content_img">
                  <img src={item.cover} alt="" />
                </div>
                <div className="details_content_detail">
                  <h1>{item.title}</h1>

                  <h5>
                    <i>
                      Giá:{" "}
                      {String(item.price * item.qty).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1,"
                      )}
                      vnđ
                    </i>
                  </h5>
                  <p>{item.author}</p>
                  <div className="qty">
                    <div className="count">
                      <button onClick={() => increment(item)}>
                        <AiOutlinePlus />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={
                          item.qty <= 1
                            ? () => deletes(item.id)
                            : () => decrement(item)
                        }
                      >
                        <AiOutlineMinus />
                      </button>
                    </div>
                    <button className="button">thêm vào giỏ hàng</button>
                  </div>
                  <div className="desc">
                    <h4>MÔ TẢ SẢN PHẨM</h4>
                    <p>{item.desc}</p>
                    <h4> THÔNG SỐ KỸ THUẬT</h4>
                    <ul>
                      <li>
                        <p>CPU:{item.cpu}</p>
                      </li>
                      <li>
                        <p>Ram :{item.ram}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </article>
      )}
    </>
  );
};
