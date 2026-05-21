import Banner from "@/components/Banner";
import { CommunitySection } from "@/components/CommunitySection";
import Featured from "@/components/Featured";
import { WhyChooseUs } from "@/components/WhyChooseUs";



export default function Home() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Global Decorative Blur */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute top-[40%] right-0 h-[500px] w-[500px] rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-300/10 blur-3xl"></div>

      <div className="relative z-10">
        <Banner />
        <Featured />
        <WhyChooseUs />
        <CommunitySection />
      </div>
    </main>
  );
}