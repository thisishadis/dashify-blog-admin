import React, { useEffect, useState } from "react";
// import Layout3 from "./Layout3";
import Layout from "../layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
export default function AllPosts() {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://dummyjson.com/products");
  //       const data = await response.json();
  //       // Assuming data is an object with a 'products' property containing the array
  //       if (data && Array.isArray(data.products)) {
  //         setProducts(data.products);
  //         console.log("products ==>", data.products);
  //       } else {
  //         console.error("Invalid data format:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const { data: products, error, isLoading } = useQuery("products", async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    if (data && Array.isArray(data.products)) {

      // setProducts(productss)
      return data.products;
    } else {
      throw new Error("Invalid data format");
    }
  });
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // const updatedProducts = products.filter(
        //   (product) => product.id !== productId
        // );
        // setProducts(updatedProducts);
        console.log(`Product with ID ${productId} deleted successfully.`);
        toast.error(`Product with ID ${productId} deleted successfully.`);
      } else {
        console.error("Failed to delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const navigate = useNavigate()
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
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
             <Box sx={{ display: 'flex' }}>
             <CircularProgress />
           </Box>
            ) : error ? (
              <tr>
                <td colSpan="6">Error loading data</td>
              </tr>
            ) : Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}  className="cursor-pointer hover">
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
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a onClick={()=>{navigate(`/edit/${product.id}`)}}>
                            Edit
                          </a>
                        </li>
                        <li>
                          <a onClick={() => deleteProduct(product.id)}>
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
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