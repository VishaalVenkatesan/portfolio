import { Footer, Navbar } from "@/components";
import  "./globals.css";

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
      <body className="sm:pl-[70px] pl-[12px] pr-[12px] sm:pr-[70px]">
        <div className="container flex flex-col justify-between min-h-screen">  
          <Navbar/>
          <main>{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}