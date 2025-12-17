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
    return (
      <p className="text-center text-error py-10">
        Blog not found.
      </p>
    );

  return (
    <Container>
      <div className="py-16">

        {/* Blog Card */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-6 shadow-sm">

          {/* Thumbnail */}
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-[420px] object-cover rounded-lg mb-6"
          />

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {blog.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-base-content max-w-none pb-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Meta Info */}
          <div className="space-y-1 text-base-content">
            <p>
              <span className="font-semibold text-primary">
                Posted by:
              </span>{" "}
              {blog.author}
            </p>

            <p>
              <span className="font-semibold text-primary">
                Email:
              </span>{" "}
              {blog.postedByEmail}
            </p>

            <p>
              <span className="font-semibold text-primary">
                Status:
              </span>{" "}
              {blog.status}
            </p>

            <p>
              <span className="font-semibold text-primary">
                Posted On:
              </span>{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogDetails;
