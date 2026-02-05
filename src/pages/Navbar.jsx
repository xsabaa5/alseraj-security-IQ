import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar(){
    const [mobileMenuIsOpen , setMobileMenuIsOpen] = useState(false);
    const [count, setCount] = useState(0)
    return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-black/20 backdrop:blur-sm">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
                <div>
                    <img src="/logo.png" alt="alseraj" className="w-32 h-auto cursor-pointer"/>
                </div>
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">

                        <Link to="/home" className="text-white/65 hover:text-white text-0.5pxduration-300">
                            Home
                        </Link>
                        <Link to="/about" className="text-white/65 hover:text-white text-0.5px duration-300">
                            About
                        </Link>
                        <Link to="/services" className="text-white/65 hover:text-white text-0.5px duration-300">
                            Services
                        </Link>
                        <Link to="/solutions" className="text-white/65 hover:text-white text-0.5px duration-300">
                            Solution
                        </Link>
                        <Link to="/contact" className="text-white/65 hover:text-white text-0.5px duration-300">
                            Contact Us
                        </Link>
                    </div>
                    <button className="md:hidden p-2 text-white/65 hover:text-white "
                    onClick={() => setMobileMenuIsOpen(prev => !prev)}
                    >
                        {mobileMenuIsOpen ? (
                          <X className="w-5 h-5 sm:w-6 sm:h-6"/>  
                        ):(
                          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </button>
                <div className="hidden md:block w-fit h-fit  bg-white/9 rounded-4xl border-white/10 hover:border-white/30 duration-300 border ">
                        <button className="py-2.5 px-5 cursor-pointer ">
                            <span>Online Store</span>
                        </button>
                </div>
                </div>
            </div>
            {mobileMenuIsOpen && (
                <div className="md:hidden w-screen h-screen  backdrop-blur-lg  animate-in slide-in-from-top duration-300  space-y-8 content-center">
                    <div className="space-y-8 justify-items-center ">

                        <Link to="/" className="block text-gray-300 hover:text-white text-xl font-extralight tracking-wide w-fit"
                           onClick={() => setMobileMenuIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link to="/about" className="block text-gray-300 hover:text-white text-xl font-extralight tracking-wide "
                            onClick={() => setMobileMenuIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link to="/services" className="block text-gray-300 hover:text-white text-xl font-extralight tracking-wide "
                            onClick={() => setMobileMenuIsOpen(false)}
                        >
                            Services
                        </Link>
                        <Link to="/solutions" className="block text-gray-300 hover:text-white text-xl font-extralight tracking-wide "
                            onClick={() => setMobileMenuIsOpen(false)}
                        >
                            Solution
                        </Link>
                        <Link to="/contact" className="block text-gray-300 hover:text-white text-xl font-extralight tracking-wide "
                            onClick={() => setMobileMenuIsOpen(false)}
                        >
                            Contact Us
                        </Link>
                    </div>
                         <div className="h-px w-10 bg-white/15  justify-self-center"/>
                            <div className=" w-fit h-fit bg-white/9 rounded-4xl border-white/10 border  justify-self-center">
                                <button className="py-2.5 px-5">
                                <span>Online Store</span>
                                </button>
                            </div>
                    </div>
            )}
        </nav>  
    );
    }