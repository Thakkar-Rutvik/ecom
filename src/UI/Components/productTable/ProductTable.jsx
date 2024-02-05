import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../../redux/features/ProductData";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { BE_URL } from "../../../configue";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

export default function ProductTable({ setShow }) {
  let dispatch = useDispatch();
  let [productUpdateId, setProductUpdateId] = useSearchParams();

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  function editData(id) {
    setProductUpdateId({ id: id });
    setShow(true);
  }

  function deleteProduct(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `${BE_URL}/product/delete/${id}`,
        })
          .then((res) => {
            dispatch(fetchProductData());
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  }

  let getAllProduct = useSelector((state) => state?.productDataSlice?.data);
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product Title</th>
            <th>Brand Name</th>
            <th>Color</th>
            <th>Available</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getAllProduct?.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img src={ele?.thumbnail} />
                </td>
                <td>{ele?.title}</td>
                <td>{ele?.brand}</td>
                <td>{ele?.color?.map((e) => e)}</td>
                <td>{ele?.stock}</td>
                <td>{ele?.price}</td>
                <td>
                  <Edit role="button" onClick={() => editData(ele?._id)} />
                  <Delete
                    role="button"
                    onClick={() => deleteProduct(ele?._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
