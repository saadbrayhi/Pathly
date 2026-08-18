import UpcomingDeadlines from "./components/home/UpcomingDeadlines";
import HowItWorks from "./components/home/HowItWorks";
import TrustSection from "./components/home/TrustSection";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <main>
      <UpcomingDeadlines />
      <HowItWorks />
      <TrustSection />
      <Footer />
    </main>
  );
}
