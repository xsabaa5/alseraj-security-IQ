import { Link } from "react-router";
import {
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const shopAndLearn = [
  "Drone",
  "Camera",
  "IT",
  "Mobile-Robotics",
  "Cyber Security",
];

const company = [
  "About Us",
  "Contact",
  "Careers",
  "Privacy Policy",
  "Terms of Service",
];

const socials = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/34934372/admin/feed/posts/" },
  { icon: FaYoutube, href: "https://www.youtube.com/@alserajcompany2735" },
  { icon: FaFacebookF, href: "https://www.facebook.com/Alseraj.almodeeh/" },
  { icon: FaInstagram, href: "https://www.instagram.com/alseraj.co/" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@alseraj.almodeeh?_t=8ocPGrrxWwk&_r=1" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div>
            <h2 className="text-white text-3xl tracking-widest font-light mb-5">
              ALSERAJ
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Powering digital transformation since 1996
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center
                    text-gray-400 hover:text-[#e93d59] hover:border-[#e93d59]/40
                    transition-all duration-300"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="flex gap-20">
            {/* Shop and Learn */}
            <div>
              <h3 className="text-[#e93d59] text-sm font-medium mb-5">
                Shop and Learn
              </h3>
              <ul className="space-y-3">
                {shopAndLearn.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[#e93d59] text-sm font-medium mb-5">
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item}>
                    <Link
                      to={item === "Contact" ? "/contact" : "/coming-soon"}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-6" />

        {/* Bottom */}
        <p className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} AL SERAJ Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
