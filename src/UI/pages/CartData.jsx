import { Delete } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItem } from "../../redux/features/CartData";
import axios from "axios";
import { BE_URL } from "../../configue";

export default function CartData() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCartItem());
  }, []);

  let { cartData, cartId } = useSelector((state) => state?.cartDataSlice);

  function addProdutCart(id) {
    axios({
      method: "post",
      url: `${BE_URL}/cart/create/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        dispatch(getAllCartItem());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function removeProdutCart(productId, productCount) {
    console.log("🚀 ~ removeProdutCart ~ productCount:", productCount);
    axios({
      method: "put",
      url: `${BE_URL}/cart/update`,
      data: {
        _id: cartId,
        productId: productId,
        isRemove: productCount == 1 ? true : false,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        dispatch(getAllCartItem());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function deleteProductItem(productId) {
    axios({
      method: "put",
      url: `${BE_URL}/cart/update`,
      data: {
        _id: cartId,
        productId: productId,
        isRemove: true,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        dispatch(getAllCartItem());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      {cartData?.map((ele, i) => {
        return (
          <div className="cart-card mb-3" key={i}>
            <img src={ele?.productId?.thumbnail} />
            <div className="card-des">
              <h4>{ele?.productId?.title}</h4>
              <p>{ele?.productId?.description}</p>
              <div className="item-count">
                <span
                  onClick={() =>
                    removeProdutCart(ele?.productId?._id, ele?.count)
                  }
                >
                  -
                </span>
                <span>{ele?.count}</span>
                <span onClick={() => addProdutCart(ele?.productId?._id)}>
                  +
                </span>
              </div>
              <Delete
                style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
                onClick={() => {
                  deleteProductItem(ele?.productId?._id);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
