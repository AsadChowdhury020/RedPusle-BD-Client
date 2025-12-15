import React from "react";
import Container from "../../../components/Shared/Container";

const partnerHospitals = [
  {
    name: "Dhaka Medical College Hospital",
    logo: "https://i.ibb.co.com/ZzLf2g0L/DMC.png",
  },
  {
    name: "Bangabandhu Sheikh Mujib Medical University",
    logo: "https://i.ibb.co.com/0ydBjPSZ/BSMMC.png",
  },
  {
    name: "Square Hospitals Ltd.",
    logo: "https://i.ibb.co.com/nMsqWxJQ/SHL.jpg",
  },
  {
    name: "United Hospital Limited",
    logo: "https://i.ibb.co.com/QFm9qdS2/UHL.png",
  },
  {
    name: "Evercare Hospital Dhaka",
    logo: "https://i.ibb.co.com/CKTY9Kmr/Evercare.webp",
  },
  {
    name: "Bangladesh Specialized Hospital",
    logo: "https://i.ibb.co.com/1Y5MF3rz/BSH.png",
  },
  {
    name: "Chittagong Medical College Hospital",
    logo: "https://i.ibb.co.com/b5YCXKrX/CMC.png",
  },
  {
    name: "Rajshahi Medical College Hospital",
    logo: "https://i.ibb.co.com/C3tNVfmT/RMC.jpg",
  },
];

const PartnerHospitals = () => {
  return (
    <Container>
      <section className="py-16 bg-base-200">
        <div className="px-4">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">
              Trusted Partner Hospitals
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-base-content/70">
              RedPulseBD is trusted by leading hospitals and medical
              institutions across Bangladesh.
            </p>
          </div>

          {/* Hospital Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
            {partnerHospitals.map((hospital, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-base-100 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={hospital.logo}
                  alt={hospital.name}
                  className="h-16 object-contain mb-3 opacity-90 hover:opacity-100 transition"
                />

                <p className="text-sm text-center text-base-content/70">
                  {hospital.name}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Note */}
          <p className="mt-10 text-center text-sm text-base-content/60">
            🤝 Partner hospitals are gradually expanding across Bangladesh.
          </p>
        </div>
      </section>
    </Container>
  );
};

export default PartnerHospitals;
