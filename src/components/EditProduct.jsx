import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {fetchProductDetails, updateProductDetails } from "../api/api";
export default function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the product details based on the product ID
    const fetchProduct = async () => {
      try {
        setUpdateLoading(true);
        const data = await fetchProductDetails(productId);
        if (data) {
          setProduct(data);
          setNewTitle(data.title);
          setNewDescription(data.description);
          setNewBrand(data.brand);
          setNewPrice(data.price);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setUpdateLoading(false);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      setUpdateLoading(true);
      const success = await updateProductDetails(productId, {
        title: newTitle,
        description: newDescription,
        brand: newBrand,
        price: newPrice,
      });

      if (success) {
        console.log(`Product with ID ${productId} updated successfully.`);
        toast.success(
          `Product with ID ${productId} updated successfully. Transfering to the main page...`
        );
        setTimeout(() => {
          navigate("/posts");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(`Error updating product: ${error.message}`);
    } finally {
      setUpdateLoading(false);
    }
  }
 

  if (loading) {
    // Render a loading state if the data is still being fetched
    return (
      <Layout>
        <div className="p-3 flex justify-center items-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="px-12 flex  flex-col gap-4 w-96">
        <h1 className="text-4xl p-3">Edit Product</h1>
        <div>
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Brand</span>
          </div>
          <input
            type="text"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button onClick={handleUpdateProduct} className={`btn btn-primary ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={updateLoading}
        >
          {updateLoading ? "Updating..." : "Update Product"}
        </button>
      </div>

      <ToastContainer />
    </Layout>
  );
}
