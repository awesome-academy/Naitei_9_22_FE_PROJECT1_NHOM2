import axiosInstance from "./AxiosCustom";

// CloudinaryService: upload image to backend API and get Cloudinary URL
export async function uploadImageToServer(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await axiosInstance.post("/cloudinary/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const data = res.data;
    return data.success && data.url ? data.url : null;
  } catch (err) {
    console.error("Image upload API error:", err);
    throw err;
  }
}

export async function uploadImagesToServer(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    try {
      const url = await uploadImageToServer(file);
      if (url) urls.push(url);
    } catch (err) {
      // Nếu upload 1 ảnh lỗi, vẫn tiếp tục các ảnh khác
      console.error("Image upload error (batch):", err);
    }
  }
  return urls;
}
