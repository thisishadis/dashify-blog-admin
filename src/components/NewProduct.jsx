import React, { useState } from 'react';
import Layout from "../layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from '../api/api';

export default function NewProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    brand: '',
    price: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    description: false,
    brand: false,
    price: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };
  
  const validateFields = () => {
    let isValid = true;
    const errors = {};

    for (const key in productData) {
      if (!productData[key]) {
        errors[key] = true;
        isValid = false;
      }
    }

    setFieldErrors(errors);
    return isValid;
  };


  const handleAddNewProduct = () => {
    if (validateFields()) {
      setLoading(true);
      addNewProduct(productData, navigate, toast, setLoading);
    } else {
      toast.error('Please fill in all fields before submitting.');
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <h2 className="text-4xl p-3">Add New Product</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="mt-1 p-2 border w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="mt-1 p-2 border w-full border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="mt-1 p-2 border w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="mt-1 p-2 border w-full border-gray-300 rounded-md"
          />
        </div>
        
        <button onClick={handleAddNewProduct} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      <ToastContainer />
    </Layout>
  );
}
