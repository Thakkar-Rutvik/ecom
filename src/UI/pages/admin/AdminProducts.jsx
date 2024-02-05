import React, { useEffect, useState } from "react";
import { Table, Modal, Form } from "react-bootstrap";
import { Delete, Edit } from "@mui/icons-material";
import Select from "react-select";
import axios from "axios";
import { BE_URL } from "../../../configue";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../../redux/features/ProductData";
import ProductTable from "../../Components/productTable/ProductTable";

export default function AdminProducts() {
  const [show, setShow] = useState(false);
  let [productCount, setProductCount] = useState("");
  let dispatch = useDispatch();
  const handleClose = () => setShow(false);

  let [addProductData, setAddProductData] = useState({
    title: "",
    thumbnail: "",
    brand: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    gender: "",
    category: [],
    color: [],
    size: [],
  });

  const options = [
    { value: "sports", label: "Sport" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "lofer", label: "Lofer" },
    { value: "party-wear", label: "Party Wear" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const Coptions = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "pink", label: "Pink" },
  ];

  const [selectedCOption, setSelectedCOption] = useState(null);

  let token = useSelector((state) => state?.LoginSlice?.token);

  let getProductId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    axios({
      method: "get",
      url: `${BE_URL}/product/getProductById/${getProductId}`,
    })
      .then((res) => {
        console.log(res.data.data);
        setAddProductData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [getProductId]);

  function sizeFun({ checked }, val) {
    let checkSize = [...addProductData?.size];
    if (checked) {
      checkSize.push(val);
      setAddProductData({ ...addProductData, size: checkSize });
    } else {
      checkSize = checkSize.filter((e) => e != val);
      setAddProductData({ ...addProductData, size: checkSize });
    }
  }

  function productDataSubmit() {
    setShow(true);
    axios({
      method: "post",
      url: `${BE_URL}/product/create`,
      data: addProductData,
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        setShow(false);
        console.log(res);
        setAddProductData({
          title: "",
          thumbnail: "",
          brand: "",
          description: "",
          price: "",
          discount: "",
          stock: "",
          gender: "",
          category: [],
          color: [],
          size: [],
        });
        dispatch(fetchProductData());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <div className="table-contain">
        <div className="table-field">
          <h1>Product List</h1>
          <div className="search-field">
            <input type="text" placeholder="Search the product" />
            <button className="btn-theme" onClick={() => setShow(true)}>
              Add Product
            </button>
          </div>
        </div>
        <ProductTable setShow={setShow} />
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-feild">
              <label>Tittle</label>
              <input
                type="text"
                value={addProductData?.title}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-feild">
              <label>thumbnail</label>
              <input
                placeholder=""
                type="text"
                value={addProductData?.thumbnail}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    thumbnail: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-feild">
              <label>Brand</label>
              <input
                placeholder=""
                type="text"
                value={addProductData?.brand}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    brand: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-feild">
              <label>Description</label>
              <input
                placeholder=""
                type="text"
                value={addProductData?.description}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-feild">
              <label>Price</label>
              <input
                placeholder=""
                type="number"
                value={addProductData?.price}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-feild">
              <label>Discount(%)</label>
              <input
                placeholder=""
                type="number"
                value={addProductData?.discount}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    discount: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-feild">
              <label>Stock</label>
              <input
                placeholder=""
                type="number"
                value={addProductData?.stock}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    stock: e.target.value,
                  })
                }
              />
            </div>
            <div className="d-flex gap-3 mb-3">
              <div className="gap-2 d-flex">
                <input
                  type="radio"
                  name="gender"
                  checked={addProductData?.gender == "male"}
                  onChange={(e) =>
                    setAddProductData({
                      ...addProductData,
                      gender: "male",
                    })
                  }
                  id="male"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="gap-2 d-flex">
                <input
                  type="radio"
                  name="gender"
                  checked={addProductData?.gender == "female"}
                  onChange={(e) =>
                    setAddProductData({
                      ...addProductData,
                      gender: "female",
                    })
                  }
                  id="female"
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="gap-2 d-flex">
                <input
                  type="radio"
                  name="gender"
                  checked={addProductData?.gender == "kids"}
                  onChange={() =>
                    setAddProductData({
                      ...addProductData,
                      gender: "kids",
                    })
                  }
                  id="kids"
                />
                <label htmlFor="kids">Kids</label>
              </div>
            </div>
            <div className="mb-3">
              <Select
                isMulti
                defaultValue={selectedOption}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    category: e.map((ele) => ele.value),
                  })
                }
                value={addProductData?.category?.map((ele) => ({
                  value: ele,
                  label: ele,
                }))}
                options={options}
              />
            </div>
            <div className="mb-3">
              <Select
                isMulti
                defaultValue={selectedCOption}
                onChange={(e) =>
                  setAddProductData({
                    ...addProductData,
                    color: e.map((ele) => ele.value),
                  })
                }
                value={addProductData?.color?.map((ele) => ({
                  value: ele,
                  label: ele,
                }))}
                options={Coptions}
              />
            </div>
            <div className="d-flex gap-3 mb-3">
              <div className="gap-2 d-flex">
                <input
                  type="checkbox"
                  id="42"
                  checked={addProductData?.size?.includes("42")}
                  onChange={(e) => sizeFun(e.target, 42)}
                />
                <label htmlFor="42">42</label>
              </div>
              <div className="gap-2 d-flex">
                <input
                  type="checkbox"
                  id="43"
                  checked={addProductData?.size?.includes("43")}
                  onChange={(e) => sizeFun(e.target, 43)}
                />
                <label htmlFor="43">43</label>
              </div>
              <div className="gap-2 d-flex">
                <input
                  type="checkbox"
                  id="44"
                  checked={addProductData?.size?.includes("44")}
                  onChange={(e) => sizeFun(e.target, 44)}
                />
                <label htmlFor="44">44</label>
              </div>
              <div className="gap-2 d-flex">
                <input
                  type="checkbox"
                  id="45"
                  checked={addProductData?.size?.includes("45")}
                  onChange={(e) => sizeFun(e.target, 45)}
                />
                <label htmlFor="45">45</label>
              </div>
              <div className="gap-2 d-flex">
                <input
                  type="checkbox"
                  id="46"
                  checked={addProductData?.size?.includes("46")}
                  onChange={(e) => sizeFun(e.target, 46)}
                />
                <label htmlFor="46">46</label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn-theme" onClick={() => productDataSubmit()}>
              Create
            </button>
            <button className="btn-theme" onClick={handleClose}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
