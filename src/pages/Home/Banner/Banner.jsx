import React from "react";
import { useNavigate } from "react-router";
import bannerBG from "../../../assets/images/BannerDeep.png";
import Container from "../../../components/Shared/Container";
import { FaHandHoldingHeart } from "react-icons/fa";
import { SlMagnifierAdd } from "react-icons/sl";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <Container>
    <section
      className="relative  text-white py-20 overflow-hidden rounded-xl shadow-lg mt-16 bg-cover bg-center z-10"
      style={{ backgroundImage: `url(${bannerBG})` }}
    >
       {/* Background decorative shapes  */}
      <div className="absolute inset-0 opacity-10 bg-[url('/blood-drop-bg.svg')] bg-no-repeat bg-center bg-cover"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow">
          A drop from you, a new pulse for someone — RedPulseBD
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Turning your donation into someone’s tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Join as Donor Button */}

          <button
            onClick={() => navigate("/signUp")}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-base-100 text-primary font-semibold rounded-full shadow transition-all cursor-pointer"
          >
            <FaHandHoldingHeart />
            Be a Donor
          </button>

          {/* Search Donors Button */}
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-base-100 text-primary font-semibold rounded-full shadow transition-all cursor-pointer"
          >
           <SlMagnifierAdd />
            Find Donors
          </button>
        </div>
      </div>
    </section>
    </Container>
  );
};

export default Banner;
