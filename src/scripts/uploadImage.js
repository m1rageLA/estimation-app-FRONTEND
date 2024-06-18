import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default async function uploadImage(imageFile) {
  if (!imageFile === null) {
    toast("Please select an image to upload.", {
      theme: "auto",
      type: "error",
      position: "top-center",
      autoClose: 1800,
      dangerouslyHTMLString: true,
    });
    return;
  } else {
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast("Image uploaded successfully!", {
        theme: "auto",
        type: "success",
        position: "top-center",
        autoClose: 1800,
        dangerouslyHTMLString: true,
      });
      return response.data.image_name;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast("Failed to upload image.", {
        theme: "auto",
        type: "error",
        position: "top-center",
        autoClose: 1800,
        dangerouslyHTMLString: true,
      });
    }
  }
}
