import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Process,
  Features,
  SpeedGrid,
  ExpandableGallery,
  ThreeSteps,
  Pricing,
  Testimonials,
  About,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Process />
        <Testimonials />
        <About />
        <Features />
        {/* <SpeedGrid /> */}
        <ExpandableGallery />
        <ThreeSteps />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
