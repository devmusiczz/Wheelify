import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="navbar h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 fixed top-0 left-0 w-full z-50">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">Wheelify</div>
        </Link>
        <NavIcons />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex mt-4 mr-44 items-center gap-3">
            <Image src="/LogoWhiteGLow.png" alt="" width={121.66} height={68.43}  />
            {/* <div className="text-2xl tracking-wide">Wheelify</div> */}
          </Link>
          <div className="hidden xl:flex gap-4">
            {/* <Link href="/">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link> */}
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
