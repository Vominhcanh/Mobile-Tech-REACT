import React from "react";
import { AiOutlineApple } from "react-icons/ai";
import { customer } from "../../assets/data/data";
import { Heading } from "../../common/Heading";

export const Testimonial = () => {
  return (
    <>
      <section className="customer">
        <Heading title="Chi nhánh của chúng tôi" />

        <div className="content">
          {customer.map((items) => (
            <div className="card" key={items.id}>
              <button>
                <AiOutlineApple size={"30px"} />
              </button>
              <div className="img">
                <img src={items.img} alt="" />
              </div>
              <p> {items.desc.slice(0, 80)}....</p>
              <h3>{items.name}</h3>
              {/* <span>{items.post}</span> */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
