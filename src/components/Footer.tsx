import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-black text-white mt-24">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-24">
        {/* LEFT */}
        <div className="w-full lg:w-1/4 flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Wheelify Logo" width={240} height={140} />
          </Link>
          {/* <p>
            Incubatin Centre, GL Bajaj , Knowledge Park 2, Greater Noida, Uttar Pradesh, India
          </p> */}
          <span className="font-semibold">info@wheelify.in</span>
          <span className="font-semibold">+91-9718707070</span>
          <div className="flex gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/facebook.png" alt="Facebook" width={30} height={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src="/insta.png" alt="Instagram" width={30} height={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src="/x.png" alt="X" width={30} height={30} />
            </a>
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex lg:w-1/4 flex-col gap-8">
          <h1 className="font-medium text-lg">COMPANY</h1>
          <div className="flex flex-col gap-4">
            <Link href="/about" className="text-white hover:text-red-500">About Us</Link>
            <Link href="/contact" className="text-white hover:text-red-500">Contact Us</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">Secure Payments</h1>
          <div className="flex gap-4">
            <Image src="/razorpay.png" alt="Razorpay" width={80} height={20} />
            <Image src="/mastercard.png" alt="MasterCard" width={40} height={20} />
            <Image src="/Upi.png" alt="UPI" width={60} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="text-sm">© 2024 Dev</div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex items-center">
            <span className="text-gray-500 mr-4">Language:</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-4">Currency:</span>
            <span className="font-medium">Rs Rupees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
