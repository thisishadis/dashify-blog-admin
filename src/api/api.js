// api.js
const API_BASE_URL = "https://dummyjson.com";

//login
export const loginUser = async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      throw new Error(`Error during login: ${error.message}`);
    }
  };


//posts
// Function to fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    if (data && Array.isArray(data.products)) {
      return data.products;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

// Function to delete a product by ID
export const deleteProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Product with ID ${productId} deleted successfully.`);
      return true;
    } else {
      console.error("Failed to delete product:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

//EDIT POST

export const fetchProductDetailss = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// Update product details based on the product ID
export const updateProductDetails = async (productId, newData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      return true;
    } else {
      const errorMessage = await response.text();
      console.error("Failed to update product:", errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


//new prodct 
export const addNewProduct = (productData, navigate, toast,setLoading) => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        console.log('Newly Created Product:', newProduct);
        toast.success('Product added successfully. transferring to the main page...');
        setTimeout(() => {
            navigate("/posts");
          }, 3000);
      })
      .catch((error) => {
        console.error('Error adding new product:', error);
        toast.error('Error adding new product.');
      }).finally(() => {
        setLoading(false);
      });
  };

  //product
  export const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      const data = await response.json();
      if (data) {
        return data;
      } else {
        console.error('Product not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };
