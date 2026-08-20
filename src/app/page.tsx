import Hero from "./components/home/Hero";
import GlobalSearch from "./components/home/GlobalSearch";
import StartSection from "./components/home/StartSection";
import PopDestination from "./components/home/PopDestination";
import FeaturedScholarships from "./components/home/FeaturedScolarship";

import UpcomingDeadlines from "./components/home/UpcomingDeadlines";
import HowItWorks from "./components/home/HowItWorks";
import TrustSection from "./components/home/TrustSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <GlobalSearch />
      <StartSection />
      <PopDestination />
      <FeaturedScholarships />

      <UpcomingDeadlines />
      <HowItWorks />
      <TrustSection />
    </main>
  );
}
