import HeroSection from "./HeroSection";
import PropertyPostForm from "./PropertyPostForm";
import StepsSection from "./StepsSection";
import StatsSection from "./StatsSection";
import WhyPostWithUs from "./WhyPostWithUs";
import FAQSection from "./FAQSection";

const PostPropertyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero + Form Section */}
      <section className="relative overflow-hidden post-property-gradient post-property-pattern">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] lg:gap-14">
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
