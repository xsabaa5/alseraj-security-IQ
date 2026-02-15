import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaMapMarkedAlt,
} from "react-icons/fa";

const socials = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/34934372/admin/feed/posts/",
  },
  { icon: FaYoutube, href: "https://www.youtube.com/@alserajcompany2735" },
  { icon: FaFacebookF, href: "https://www.facebook.com/Alseraj.almodeeh/" },
  { icon: FaInstagram, href: "https://www.instagram.com/alseraj.co/" },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@alseraj.almodeeh?_t=8ocPGrrxWwk&_r=1",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: FaPhone,
      title: t("contact.phone"),
      lines: ["+964 784 960 0500", "+964 781 107 0090"],
    },
    {
      icon: FaEnvelope,
      title: t("contact.email"),
      lines: ["info@alseraj.iq", "marketing@alseraj.iq"],
    },
    {
      icon: FaMapMarkerAlt,
      title: t("contact.location"),
      lines: [t("contact.locationLine1"), t("contact.locationLine2")],
      link: {
        label: t("contact.viewOnMap"),
        href: "https://www.google.com/maps?ll=33.313688,44.439563&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=16529537251882699904",
      },
    },
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="w-full min-h-screen bg-black text-white px-6 py-12 font-Montserrat">
      {/* Back to Home */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#e93d59] rounded-full
          text-[#e93d59] text-sm font-normal tracking-wide
          hover:bg-[#e93d59] hover:text-white transition-all duration-300 group mb-12"
      >
        <FaArrowLeft className="text-sm group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1 transition-transform duration-300" />
        <span>{t("contact.backToHome")}</span>
      </Link>

      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="text-[clamp(2.5rem,7vw,5rem)] font-light italic
            bg-linear-to-r from-[#e93d59] to-[#e93d59]/70 bg-clip-text text-transparent mb-4"
        >
          {t("contact.title")}
        </h1>
        <p className="text-gray-400 text-[clamp(0.9rem,2vw,1.1rem)] max-w-xl mx-auto">
          {t("contact.subtitle")}
        </p>
      </div>

      {/* Contact Info + Map */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
        {/* Info Cards */}
        <div className="flex flex-col gap-6">
          {/* eslint-disable-next-line no-unused-vars */}
          {contactInfo.map(({ icon: Icon, title, lines, link }) => (
            <div
              key={title}
              className="flex items-start gap-5 p-6 rounded-xl border border-white/10
                bg-white/3 hover:border-[#e93d59]/30 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-full bg-[#e93d59]/15 flex items-center justify-center
                  shrink-0"
              >
                <Icon className="text-[#e93d59] text-lg" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {title}
                </h3>
                {lines.map((line) => (
                  <p
                    key={line}
                    dir="ltr"
                    className="text-gray-400 text-sm leading-relaxed rtl:text-right"
                  >
                    {line}
                  </p>
                ))}
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#e93d59] text-sm mt-2
                      hover:underline"
                  >
                    <FaMapMarkedAlt />
                    {link.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Google Map */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          <iframe
            title="Al Seraj Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d44.439563!3d33.313688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577e1041f7e58d%3A0xe56039b4e51c4480!2sAl%20Seraj%20Co.%20for%20Information%20Technology!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq"
            width="100%"
            height="100%"
            style={{
              border: 0,
              minHeight: "400px",
              filter: "invert(90%) hue-rotate(180deg)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Send Message Form */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold mb-3">
            {t("contact.sendMessage")}
          </h2>
          <p className="text-gray-400 text-[clamp(0.85rem,2vw,1rem)]">
            {t("contact.sendSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              placeholder={t("contact.yourName")}
              value={form.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-white/5 border border-white/10
                text-white placeholder-gray-500 text-sm outline-none
                focus:border-[#e93d59]/50 transition-colors duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.yourEmail")}
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-white/5 border border-white/10
                text-white placeholder-gray-500 text-sm outline-none
                focus:border-[#e93d59]/50 transition-colors duration-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="tel"
              dir="auto"
              name="phone"
              placeholder={t("contact.phoneNumber")}
              value={form.phone}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-white/5 border border-white/10
                text-white placeholder-gray-500 text-sm outline-none
                focus:border-[#e93d59]/50 transition-colors duration-300"
            />
            <input
              type="text"
              name="subject"
              placeholder={t("contact.subject")}
              value={form.subject}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-white/5 border border-white/10
                text-white placeholder-gray-500 text-sm outline-none
                focus:border-[#e93d59]/50 transition-colors duration-300"
            />
          </div>
          <textarea
            name="message"
            placeholder={t("contact.yourMessage")}
            rows={6}
            value={form.message}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-lg bg-white/5 border border-white/10
              text-white placeholder-gray-500 text-sm outline-none resize-vertical
              focus:border-[#e93d59]/50 transition-colors duration-300"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-[#e93d59] hover:bg-[#d6324d]
              text-white text-lg font-medium tracking-wide
              transition-all duration-300 cursor-pointer"
          >
            {t("contact.send")}
          </button>
        </form>
      </div>

      {/* Connect With Us */}
      <div className="text-center pb-12">
        <h3 className="text-[clamp(1.2rem,3vw,1.8rem)] font-medium mb-8">
          {t("contact.connectWithUs")}
        </h3>
        <div className="flex justify-center gap-5">
          {/* eslint-disable-next-line no-unused-vars */}
          {socials.map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center
                text-white text-xl hover:text-[#e93d59] hover:border-[#e93d59]/40
                transition-all duration-300"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
