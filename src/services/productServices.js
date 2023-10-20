import axios from "axios";

const backendUrl = `http://${process.env.REACT_APP_SERVER_URL}`;

const instance = axios.create({
  baseURL: backendUrl,
});

export async function getProducts() {
  try {
    const response = await instance.get("/api/products/");
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function createProduct(productData) {
  try {
    const response = await instance.post("/api/products/", productData);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await instance.put(`/api/products/${id}`, productData);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await instance.delete(`/api/products/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
