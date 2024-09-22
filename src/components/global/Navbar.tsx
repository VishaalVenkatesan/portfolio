import Link from "next/link";
export default function Navbar(){
    return(
        <div className="flex flex-row justify-between">
            <Link href="/" className="text-3xl font-bold p-4 z-10 font-serif">VV.</Link>
        </div>
    )
}