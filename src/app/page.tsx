import { Navbar } from "@/components/navbar";
import { Hero } from "@/sections/hero";
import { MethodExplorer } from "@/sections/method-explorer";
import { ChatSection } from "@/sections/chat-section";
import { StudyPlanSection } from "@/sections/study-plan-section";
import { Footer } from "@/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MethodExplorer />
        <ChatSection />
        <StudyPlanSection />
      </main>
      <Footer />
    </>
  );
}
