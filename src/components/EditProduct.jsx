import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    // Fetch the product details based on the product ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        const data = await response.json();
        if (data) {
          setProduct(data);
          setNewTitle(data.title);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
          }),
        }
      );

      if (response.ok) {
        console.log(`Product with ID ${productId} updated successfully.`);
        toast.success(`Product with ID ${productId} updated successfully.`);
      } else {
        console.error("Failed to update product:", response.statusText);
        toast.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-4xl p-3">Edit Product</h1>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <button onClick={handleUpdateProduct}>Update Product</button>
      </div>
      <ToastContainer />
    </Layout>
  );
}
