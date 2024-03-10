import Box from "@mui/material/Box";
import { useQuery } from "react-query";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import VISI from "../assets/visibility_icon.svg";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteProductById, fetchProducts } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";

export default function AllPosts() {
  const navigate = useNavigate();
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("products", fetchProducts);

  const deleteProduct = async (productId) => {
    try {
      const isDeleted = await deleteProductById(productId);

      if (isDeleted) {
        toast.success(`Product with ID ${productId} deleted successfully.`);
      } else {
        console.error("Failed to delete product.");
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-4xl p-3">All Products</h1>
        <div className="overflow-x-auto">
          <table className="table overflow-hidden">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>title</th>
                <th>description</th>
                <th>brand</th>
                <th>price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <tr>
                  <td colSpan="6">Error loading data</td>
                </tr>
              ) : Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="cursor-pointer hover">
                    <th>#{product.id}</th>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn  m-1">
                          ....
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li><a onClick={() => {navigate(`/edit/${product.id}`); }}> Edit</a></li>
                          <li><a onClick={() => deleteProduct(product.id)}> Delete</a></li>
                        </ul>
                      </div>
                    </td>
                    <td onClick={() => {navigate(`/product/${product.id}`);}}>
                      <img src={VISI} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
