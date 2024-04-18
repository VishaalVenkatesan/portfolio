import { Footer, Navbar } from "@/components";
import  "./globals.css";
import Providers from "./providers";

export const metadata = {
  title:{
    default:"Vishaal Venkatesan",
    template:"%s | Vishaal Venkatesan",
  },  
  description:"Portfolio ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="sm:ml-[70px] ml-[12px] mr-[12px] sm:mr-[70px]">
        <div className="container flex flex-col justify-between min-h-screen ">  
        <Providers>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
          </Providers>
        </div>
      </body>
    </html>
  );
}