import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import { TfiWrite } from "react-icons/tfi";

const Blogs = () => {
  const axiosInstance = useAxios();
  const [searchText, setSearchText] = useState("");

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <p className="text-center text-primary py-10">
        Failed to load blogs. Please try again.
      </p>
    );
  }

  return (
    <Container>
      <div className=" py-16">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold mb-6 text-primary">
            All Blood Donation Related Blogs
          </h1>
          {/* <Link to='/create-blog' className="btn btn-primary">
            Add a Blog <TfiWrite />
          </Link> */}
          <Link to={"/create-blog"} className="btn btn-primary">
            Add a Blog <TfiWrite />
          </Link>
        </div>

        {/* Blog Cards */}
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No blogs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className=" shadow-lg shadow-secondary rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {/* Optionally show part of content as a preview */}
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                  </p>
                  <span className="flex justify-end">
                    <Link
                      to={`/blog-details/${blog._id}`}
                      className="btn btn-primary"
                    >
                      Details <FaArrowRight />
                    </Link>
                  </span>
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
