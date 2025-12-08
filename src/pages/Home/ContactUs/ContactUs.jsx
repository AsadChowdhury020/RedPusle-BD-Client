import React from "react";
// import useAxios from "../../Hooks/useAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Container from "../../../components/Shared/Container";
import { IoIosCall } from "react-icons/io";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineWatchLater,
} from "react-icons/md";

const ContactUs = () => {
  //   const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const contactInfo = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    try {
      //   await axiosInstance.post("/contacts", contactInfo);
      Swal.fire("Success!", "Your message has been sent!", "success");
      reset();
    } catch (error) {
      console.error("Contact error:", error);
      Swal.fire("Error!", "Failed to send message", "error");
    }
  };

  return (
    <Container>
      <section className="scroll-mt-20" id="contact">
        {/* Headings */}
        <h2 className="text-4xl text-primary font-bold  mb-4 text-center">
          We’d Love to Hear From You
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looking to collaborate, ask a question, or offer feedback? share your
          thoughts, or get support. We’re here to listen. Fill out the form or
          use our contact details to connect instantly.
        </p>
        <div className=" grid lg:grid-cols-2 gap-12 items-center ">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-xl shadow-md space-y-4 border border-secondary"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Feedback</label>
              <textarea
                rows="4"
                className="textarea textarea-bordered w-full"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <div className="flex  items-center text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
              <IoIosCall className="mr-2" /> Official Hotline Number:{"  "}
              <a href="" className="text-primary hover:underline">
                +880 1234567890
              </a>
            </div>
            <div className="flex  items-center text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
              <MdOutlineEmail className="mr-2" /> Support Email:{" "}
              <a href="" className="text-primary hover:underline">
                support@red.pulse.bd.org
              </a>
            </div>
            <div className="flex  items-center text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
              <MdOutlineLocationOn className="mr-2" /> Office Location:{" "}
              <a href="" className="text-primary hover:underline">
                Mohammadpur, Dhaka, Bangladesh
              </a>
            </div>
            <div className="flex  items-center text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
              <MdOutlineWatchLater className="mr-2" /> Support Hours:{" "}
              <a href="" className="text-primary hover:underline">
                24/7 (We typically respond within 24 hours)
              </a>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ContactUs;
