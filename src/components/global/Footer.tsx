import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
}

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="p-3 items-center text-center font-semibold text-sm border-t-2 flex flex-row justify-between">
            <div className="">
            </div>
            <div>
                © {currentYear} All rights reserved.
            </div>
            <Button onClick={scrollToTop} variant="link">
                <ArrowUp className="w-4 h-4" />
            </Button>
        </footer>
    );
}
