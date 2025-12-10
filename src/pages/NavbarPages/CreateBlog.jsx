import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";

const CreateBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    // 1️⃣ Upload image to imgbb
    const image = data.thumbnail[0];
    const formData = new FormData();
    formData.append("image", image);

    let imageUrl = "";
    try {
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      imageUrl = uploadRes.data.data.url;
    } catch (err) {
      Swal.fire("Error", "Image upload failed", "error");
      setLoading(false);
      return;
    }

    // 2️⃣ Prepare blog data
    const blogData = {
      title: data.title,
      thumbnail: imageUrl,
      content: data.content,
      postedByEmail: user.email,
      author: user.displayName || "Unknown Author",
      createdAt: new Date().toISOString(),
      status: "published"
    };

    // 3️⃣ Send blog to database
    try {
      const res = await axiosSecure.post("/blogs", blogData);

      Swal.fire("Success", "Blog added successfully!", "success");
      reset();
    } catch (err) {
      Swal.fire("Error", "Failed to publish blog", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto p-6 mt-10 border shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Write a New Blog
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <div>
            <label className="label">Blog Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter blog title"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="label">Thumbnail Image</label>
            <input
              type="file"
              {...register("thumbnail", { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Content */}
          <div>
            <label className="label">Blog Content</label>
            <textarea
              {...register("content", { required: true })}
              rows={7}
              className="textarea textarea-bordered w-full"
              placeholder="Write your blog content (100–150 words suggested)"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateBlog;
