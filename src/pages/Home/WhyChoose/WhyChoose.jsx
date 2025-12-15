import React from "react";
import {
  HeartPulse,
  Users,
  Search,
  Clock,
  ShieldCheck,
  BellRing,
  Heart,
  MapPin,
} from "lucide-react";
import Container from "../../../components/Shared/Container";
import { TbNetwork } from "react-icons/tb";
import { TfiGift } from "react-icons/tfi";

const features = [
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: "Fast Donor Matching",
    description:
      "Instantly connects patients with the nearest compatible blood donors.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Verified Donor Profiles",
    description: "Every donor is verified to ensure safety and authenticity.",
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Smart Blood Search",
    description:
      "Find the right blood group easily with an intuitive search system.",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "24/7 Emergency Support",
    description:
      "Donor data is available anytime for emergency blood requirements.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Secure & Private",
    description: "Your information is protected with strong privacy measures.",
  },
  {
    icon: <BellRing className="w-8 h-8 text-primary" />,
    title: "Instant Alerts",
    description: "Donors receive instant notifications when a match is found.",
  },
  {
    icon: <TfiGift className="w-8 h-8 text-primary" />,
    title: "Reward System",
    description:
      "Earn badges and recognition for contributing to saving lives.",
  },
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Life-Saving Impact",
    description:
      "Every donation directly saves patients during critical moments.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Location-Based Matching",
    description:
      "Automatically matches donors near your location for faster response.",
  },
  {
    icon: <TbNetwork className="w-8 h-8 text-primary" />,
    title: "Nationwide Network",
    description: "RedPulseBD connects donors and recipients across Bangladesh.",
  },
];

const WhyChoose = () => {
  return (
    <Container>
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">
            Why Choose RedPulseBD?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base-content/70">
            We strive to ensure that every donation experience is smooth,
            secure, and truly life-changing.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm text-center hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-base-content mb-2">
                {feature.title}
              </h3>

              <p className="text-base-content/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default WhyChoose;
