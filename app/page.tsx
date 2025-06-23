import Footer from "./components/Footer";
import InstagramFeed from "./components/InstagramFeed";
import Navbar from "./components/Navbar";
import BusinessInfo from "./components/BusinessInfo";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center ">
      <Navbar />
      <BusinessInfo />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
