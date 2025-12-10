import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-center text-red-500">Blog not found.</p>;

  return (
    <Container>
      <div className="py-16 bg-base-200 ">
        {/* Blog Thumbnail */}
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-100 object-cover rounded-lg mb-6"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-primary">{blog.title}</h1>

        {/* Blog Content */}
        <div
          className="prose max-w-none text-gray-700 dark:text-gray-400 lg:pb-5 md:pb-3 pb-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <p><span className="text-lg font-bold text-primary">Posted by: </span> {blog.author}</p>
        <p><span className="text-lg font-bold text-primary">Email: </span>{blog.postedByEmail}</p>
        <p><span className="text-lg font-bold text-primary">Status: </span> {blog.status}</p>
        <p><span className="text-lg font-bold text-primary">Posted On: </span> {new Date(blog.createdAt).toISOString().split("T")[0]}</p>
      </div>

      {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
    </Container>
  );
};

export default BlogDetails;
