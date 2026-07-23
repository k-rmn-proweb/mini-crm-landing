import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Tech } from "@/components/sections/tech";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Tech />
      <Cta />
      <Contact />
    </>
  );
}
