import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default async function updateItem(path, formData) {
  try {
    const response = await axios.put(`http://localhost:8000/api/${path}`, formData);

    toast("Client updated successfully!", {
      theme: "auto",
      type: "success",
      position: "top-center",
      autoClose: 1800,
      dangerouslyHTMLString: true,
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data.errors);
    toast(error.request, {
      theme: "auto",
      type: "error",
      position: "top-center",
      autoClose: 1800,
      dangerouslyHTMLString: true,
    });

    throw error;
  }
}
