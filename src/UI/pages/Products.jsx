import React, { useEffect } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../redux/features/ProductData";
import axios from "axios";
import { BE_URL } from "../../configue";
import { getAllCartItem } from "../../redux/features/CartData";

export default function Products() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  let getAllProduct = useSelector((state) => state?.productDataSlice?.data);

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

  return (
    <>
      <div className="table-contain">
        <div className="table-field">
          <h1>Products</h1>
        </div>
        <div className="row">
          {getAllProduct.map((ele, i) => {
            return (
              <div className="col-3 mb-4" key={i}>
                <Card className="h-100">
                  <img src={ele.thumbnail} />
                  <CardBody>
                    <CardTitle tag="h5">{ele.title}</CardTitle>
                    <CardText>{ele.description}</CardText>
                    <button
                      className="btn-theme"
                      onClick={() => addProdutCart(ele._id)}
                    >
                      Add To Cart
                    </button>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
