import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Process,
  Features,
  AppPreview,
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
        <AppPreview />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
