import Experience from "@/components/pages/experience";
import Hero from "@/components/pages/hero";
import Projects from "@/components/pages/projects";
import Gallery from "@/components/pages/gallery";
import Contact from "@/components/pages/contact";
import Blog from "@/components/pages/blog";

export default function Page(){
  return(
    <div className="min-h-screen">
      <Hero />
      <Experience />
      <Projects />
      <Blog />
      <div className="md:block hidden">
      <Gallery />
      </div>
      <Contact />
    </div>
  )

}