import Experience from "@/components/pages/experience";
import Hero from "@/components/pages/hero";
import Projects from "@/components/pages/projects";
import Gallery from "@/components/pages/gallery";
import Contact from "@/components/pages/contact";

export default function Page(){
  return(
    <div className="min-h-screen">
      <Hero />
      <Experience />
      <Projects />
      <Gallery />
      <Contact />
    </div>
  )

}