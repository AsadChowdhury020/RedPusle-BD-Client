import { HeartPulse, Users, ShieldCheck, HandHeart } from "lucide-react";
import Container from "../../components/Shared/Container";
import aboutUsImg from '../../assets/images/AboutUs.png'

const AboutUs = () => {
  return (
<Container>
        <section className="py-16 bg-base-200">
      <div className=" px-6 lg:px-0">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">About RedPulseBD</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We are committed to connecting voluntary blood donors with patients in need,
            ensuring a faster, safer, and more reliable donation experience across Bangladesh.
          </p>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-secondary">
              Saving Lives Through Technology & Compassion
            </h3>

            <p className="text-gray-700 leading-relaxed">
              RedPulseBD is a modern blood donation management system designed to simplify
              the process of finding and connecting with donors. Our mission is to ensure
              that no life is lost due to a shortage of blood.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Whether you're seeking blood urgently or want to contribute as a donor, 
              our platform offers a secure and user-friendly experience to support you every step of the way.
            </p>

            {/* Mission Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

              <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl shadow-sm">
                <HeartPulse className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Life-Saving Mission</h4>
                  <p className="text-sm text-gray-600">
                    Dedicated to making blood accessible when it’s needed most.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl shadow-sm">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Strong Donor Community</h4>
                  <p className="text-sm text-gray-600">
                    Building a network of reliable voluntary blood donors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl shadow-sm">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Verified & Secure System</h4>
                  <p className="text-sm text-gray-600">
                    Ensuring trust, safety, and data protection for all users.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl shadow-sm">
                <HandHeart className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Community Support</h4>
                  <p className="text-sm text-gray-600">
                    Encouraging compassion and volunteer spirit across the country.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center">
            <img
              src={aboutUsImg}
              alt="Blood donation"
              className="rounded-2xl shadow-lg w-full max-w-md"
            />
          </div>

        </div>
      </div>
    </section>
</Container>
  );
};

export default AboutUs;
