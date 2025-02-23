import InstagramFeed from "./components/InstagramFeed";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center ">
      <Navbar />
      <InstagramFeed />
    </main>
  );
}
