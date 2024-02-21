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
      <body className="lg:pl-[70px] sm:pl-[12px] ">
        <div className="container">  
        <Navbar/>
      {children}
      <Footer/>
        </div>
        </body>
     
    </html>
  );
}