import Hero from "./components/home/Hero";
import GlobalSearch from "./components/home/GlobalSearch";
import StartSection from "./components/home/StartSection";
import PopDestination from "./components/home/PopDestination";
import FeaturedScholarships from "./components/home/FeaturedScolarship";

export default function Home() {
  return (
    <>
      <Hero />
      <GlobalSearch />
      <StartSection />
      <PopDestination />
      <FeaturedScholarships />
    </>
  );
}