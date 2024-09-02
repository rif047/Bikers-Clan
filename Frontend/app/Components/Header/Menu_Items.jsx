import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function Menu_Items({ hideMenu }) {
    const currentRoute = usePathname();

    return (
        <nav className="[&>*]:mr-3 [&>*]:px-4 [&>*]:py-2 [&>*]:shadow-md [&>*]:rounded [&>*]:text-sm [&>*]:font-bold [&>*]:transition-all [&>*]:cursor-pointer [&>*]:text-gray-700">

            <Link onClick={hideMenu} href="/" className={`${currentRoute === "/" ? "text-gray-900 bg-gray-400 shadow-lg" : ""} hover:text-black hover:bg-gray-300 hover:shadow-lg hover:py-1`}>Home</Link>

            <Link onClick={hideMenu} href="/products" className={`${currentRoute === "/products/" ? "text-gray-900 bg-gray-400 shadow-lg" : ""} hover:text-black hover:bg-gray-300 hover:shadow-lg hover:py-1`}>Products</Link>

            <Link onClick={hideMenu} href="/about" className={`${currentRoute === "/about/" ? "text-gray-900 bg-gray-400 shadow-lg" : ""} hover:text-black hover:bg-gray-300 hover:shadow-lg hover:py-1`}>About</Link>

            <Link onClick={hideMenu} href="/blog" className={`${currentRoute === "/blog/" ? "text-gray-900 bg-gray-400 shadow-lg" : ""} !px-10 hover:!text-black hover:bg-gray-300 hover:shadow-lg hover:py-1 bg-gray-800 !text-white`}>Posts</Link>

        </nav>
    )
}
