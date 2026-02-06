import HeroSection from "./HeroSection";
import PropertyPostForm from "./PropertyPostForm";
import StepsSection from "./StepsSection";
import StatsSection from "./StatsSection";
import WhyPostWithUs from "./WhyPostWithUs";
import FAQSection from "./FAQSection";

const PostPropertyPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr]">
          <HeroSection />
          <PropertyPostForm />
        </div>
      </section>

      <StepsSection />
      <StatsSection />
      <WhyPostWithUs />
      <FAQSection />
    </div>
  );
};

export default PostPropertyPage;
