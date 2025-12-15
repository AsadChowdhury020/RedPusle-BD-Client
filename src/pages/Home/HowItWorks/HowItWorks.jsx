import { UserPlus, Search, Droplet, Heart } from "lucide-react";
import Container from "../../../components/Shared/Container";

const steps = [
  { icon: UserPlus, title: "Register", desc: "Create your donor profile" },
  { icon: Search, title: "Find Request", desc: "Search nearby blood needs" },
  { icon: Droplet, title: "Donate Blood", desc: "Donate safely & quickly" },
  { icon: Heart, title: "Save Life", desc: "Be someone's hero" },
];

const HowItWorks = () => {
  return (
    <Container>
      <section className="py-16">
        <h2 className="text-4xl font-bold text-primary text-center my-10">
          How It Works
        </h2>

        <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm text-center hover:shadow-md transition"
            >
              <step.icon className="w-10 h-10 mx-auto text-primary mb-3" />

              <h4 className="font-semibold text-base-content">
                {step.title}
              </h4>

              <p className="text-sm text-base-content/70">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default HowItWorks;
