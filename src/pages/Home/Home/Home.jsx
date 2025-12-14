import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import HowItWorks from "../HowItWorks/HowItWorks";
import PartnerHospitals from "../PartnerHospitals/PartnerHospitals";
import WhyChoose from "../WhyChoose/WhyChoose";
import BloodGroupCompatibility from "./BloodGroupCompatibility/BloodGroupCompatibility";
import FAQSection from "./FAQSection/FAQSection";
import SafetyPrivacy from "./SafetyPrivacy/SafetyPrivacy";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <WhyChoose></WhyChoose>
      <BloodGroupCompatibility></BloodGroupCompatibility>
      <PartnerHospitals></PartnerHospitals>
      <SafetyPrivacy></SafetyPrivacy>
      <FAQSection></FAQSection>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
