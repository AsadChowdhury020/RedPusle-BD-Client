import React from "react";
import { ShieldCheck, Lock, UserCheck, EyeOff } from "lucide-react";
import Container from "../../../../components/Shared/Container";

const safetyFeatures = [
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    title: "Verified Donors",
    description:
      "All donors are verified through email and activity checks to ensure authenticity.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "Secure Data Storage",
    description:
      "We use secure systems to protect personal information and prevent unauthorized access.",
  },
  {
    icon: <EyeOff className="w-8 h-8 text-primary" />,
    title: "Privacy Protected",
    description: "Your personal details are never shared without your consent.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Admin Moderation",
    description:
      "Every request is monitored by admins to ensure safety and prevent misuse.",
  },
];

const SafetyPrivacy = () => {
  return (
    <Container>
      <section className="py-16 bg-base-200">
        <div className="px-4">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">
              Safety & Privacy
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-base-content/70">
              Your safety and privacy are our top priorities. RedPulseBD follows
              strict security and verification practices.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-base-100 border border-base-300 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-base-content mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-base-content/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="mt-10 text-center text-sm text-base-content/60">
            🔒 We are committed to maintaining a safe, transparent, and reliable
            blood donation platform.
          </p>
        </div>
      </section>
    </Container>
  );
};

export default SafetyPrivacy;
