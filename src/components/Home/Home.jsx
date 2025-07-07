import HeroCarousel from "../HeroCarousel/HeroCarousel";
import OurRecipes from "../OurRecipes/OurRecipes";
import AboutSection from "../AboutSection/AboutSection";
import BlogSection from "../BlogSection/BlogSection";
import ClientSection from "../ClientSection/ClientSection";
import ContactSection from "../ContactSection/ContactSection";

const Home = () => {
  return (
    <>
      <div>
        <div className="container-width">
          <HeroCarousel />
          <OurRecipes />
          <AboutSection />
          <BlogSection />
          <ClientSection />
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Home;
