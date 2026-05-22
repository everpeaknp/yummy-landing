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
  OurCustomers,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <OurCustomers />
        <Process />
        <Testimonials />
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
