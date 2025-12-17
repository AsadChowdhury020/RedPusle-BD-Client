import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import { TfiWrite } from "react-icons/tfi";

const Blogs = () => {
  const axiosInstance = useAxios();

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blogs");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <p className="text-center text-error py-10">
        Failed to load blogs. Please try again.
      </p>
    );
  }

  return (
    <Container>
      <div className="py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold text-primary">
            Blood Donation Related Blogs
          </h1>

          <Link to="/create-blog" className="btn btn-primary">
            Add a Blog <TfiWrite />
          </Link>
        </div>

        {/* Blog Cards */}
        {blogs.length === 0 ? (
          <p className="text-center text-base-content/60">
            No blogs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-base-100 border border-base-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-base-content mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-base-content/70 line-clamp-3 mb-4">
                    {blog.content
                      .replace(/<[^>]+>/g, "")
                      .slice(0, 100)}
                    ...
                  </p>

                  <div className="flex justify-end">
                    <Link
                      to={`/blog-details/${blog._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Details <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Blogs;
