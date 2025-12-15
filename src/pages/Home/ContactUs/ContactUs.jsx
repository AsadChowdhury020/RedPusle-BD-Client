import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Container from "../../../components/Shared/Container";
import { IoIosCall } from "react-icons/io";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineWatchLater,
} from "react-icons/md";
import useAxios from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ContactUs = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();

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
      await axiosInstance.post("/contacts", contactInfo);
      Swal.fire("Success!", "Your message has been sent!", "success");
      reset();
    } catch (error) {
      Swal.fire("Error!", "Failed to send message", "error");
    }
  };

  return (
    <Container>
      <section className="scroll-mt-20 py-16" id="contact">

        {/* Headings */}
        <h2 className="text-4xl text-primary font-bold mb-4 text-center">
          We’d Love to Hear From You
        </h2>

        <p className="text-base-content/70 mb-10 text-center max-w-2xl mx-auto">
          Looking to collaborate, ask a question, or offer feedback? Share your
          thoughts or get support. We’re here to listen.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-xl space-y-4 border border-base-300 bg-base-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-1 text-base-content">
                  Your Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  defaultValue={user?.displayName || ""}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-error">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 text-base-content">
                  Your Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  defaultValue={user?.email || ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-error">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-base-content">
                Feedback
              </label>
              <textarea
                rows="4"
                className="textarea textarea-bordered w-full"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && (
                <p className="text-sm text-error">{errors.message.message}</p>
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
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center gap-2 text-lg font-medium text-base-content/80">
              <IoIosCall className="text-primary" />
              <span>Official Hotline:</span>
              <span className="text-primary">+880 1234567890</span>
            </div>

            <div className="flex items-center gap-2 text-lg font-medium text-base-content/80">
              <MdOutlineEmail className="text-primary" />
              <span>Support Email:</span>
              <span className="text-primary">support@redpulsebd.org</span>
            </div>

            <div className="flex items-center gap-2 text-lg font-medium text-base-content/80">
              <MdOutlineLocationOn className="text-primary" />
              <span>Office:</span>
              <span className="text-primary">
                Mohammadpur, Dhaka, Bangladesh
              </span>
            </div>

            <div className="flex items-center gap-2 text-lg font-medium text-base-content/80">
              <MdOutlineWatchLater className="text-primary" />
              <span>Support Hours:</span>
              <span className="text-primary">24/7</span>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ContactUs;
