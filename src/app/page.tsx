import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { VideoDemo } from "@/components/sections/VideoDemo";
import { FeaturedOffer } from "@/components/sections/FeaturedOffer";
import { Reviews } from "@/components/sections/Reviews";
import { Comparison } from "@/components/sections/Comparison";
import { Guarantee } from "@/components/sections/Guarantee";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofStrip />
      <ProblemSection />
      <HowItWorks />
      <Benefits />
      <BeforeAfter />
      <VideoDemo />
      <FeaturedOffer />
      <Reviews />
      <Comparison />
      <Guarantee />
      <FAQ />
      <FinalCTA />
    </>
  );
}
