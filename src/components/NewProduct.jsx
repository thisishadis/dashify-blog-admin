import React, { useState } from 'react';
import Layout from "../layouts/Layout";

export default function NewProduct() {
  const [productData, setProductData] = useState({
    title: '',
    description: '', // Add description field
    // Add other product data fields here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addNewProduct = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        console.log('Newly Created Product:', newProduct);
        // Handle the new product data as needed
      })
      .catch((error) => {
        console.error('Error adding new product:', error);
        // Handle errors as needed
      });
  };

  return (
    <Layout>
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
          className="mt-1 p-2 border border-gray-300 rounded-md"
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
          className="mt-1 p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      {/* Add other input fields for additional product data here */}
      <button onClick={addNewProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </Layout>
  );
}









// import React, { useState } from 'react';
// import Layout from "../layouts/Layout"
// export default function NewProduct() {
//   const [productData, setProductData] = useState({
//     title: 'BMW Pencil',
//     /* other product data */
//   });

//   const addNewProduct = () => {
//     fetch('https://dummyjson.com/products/add', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(productData),
//     })
//       .then((res) => res.json())
//       .then((newProduct) => {
//         console.log('Newly Created Product:', newProduct);
//         // Handle the new product data as needed
//       })
//       .catch((error) => {
//         console.error('Error adding new product:', error);
//         // Handle errors as needed
//       });
//   };

//   return (
//     <Layout>
//       <h2 className="text-4xl p-3">Add New Product</h2>
//       <button onClick={addNewProduct}>Add Product</button>
//     </Layout>
//   );
// }
