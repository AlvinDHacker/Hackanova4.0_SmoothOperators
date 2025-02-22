import {
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define types for our data structures
type FooterLink = {
  name: string;
  link: string;
};

type FooterLinkSection = {
  title: string;
  links: FooterLink[];
};

type SocialMediaLink = {
  id: string;
  icon: string;
  link: string;
};

// Footer data
const footerLinks: FooterLinkSection[] = [
  {
    title: "Useful Links",
    links: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Maps", link: "/emergencies/map" },
      { name: "Emergencies", link: "/emergencies" },
      { name: "Analytics", link: "/dashboard/analytics" },
    ],
  },
  {
    title: "Creators",
    links: [
      { name: "Alvin Dsouza", link: "https://github.com/AlvinDHacker" },
      { name: "Alston Soares", link: "https://github.com/Alstudd" },
      { name: "Joyvin Mendonca", link: "https://github.com/Joyvin" },
      { name: "Jayden Colaco", link: "https://github.com/jaydencolaco" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Mail", link: "mailto:alvindsouza2204@gmail.com" },
      { name: "Phone", link: "tel:9820257477" },
    ],
  },
];

const Footer = () => {
  return (
    <section className="flex flex-col items-center justify-center border-t border-gray-200 py-6 dark:border-gray-800">
      <div className="mx-auto w-[90%]">
        <div className="mb-8 flex w-full flex-col items-start justify-center md:flex-row">
          <div className="flex flex-1 flex-col justify-start md:mt-4">
            <div className="flex items-center gap-4 text-2xl font-bold">
              <ShieldCheck className="text-green-600" />
              <div className="px-1 py-1">Relief ResQ</div>
            </div>
            <p className="font-poppins text-dimWhite mt-4 max-w-[312px] text-sm font-normal">
              A new way to help people in need.
            </p>
          </div>

          <div className="flex w-full flex-[1.5] flex-row flex-wrap justify-between">
            {footerLinks.map((footerlink) => (
              <div
                key={footerlink.title}
                className="mt-5 flex min-w-[150px] flex-col md:mt-0"
              >
                <h4 className="text-md font-semibold uppercase text-black dark:text-white">
                  {footerlink.title}
                </h4>
                <ul className="mt-4 list-none">
                  {footerlink.links.map((link, index) => (
                    <li
                      key={link.name}
                      className={`cursor-pointer text-sm hover:text-green-500 ${
                        index !== footerlink.links.length - 1 ? "mb-2" : "mb-0"
                      }`}
                    >
                      {footerlink.title == "Creators" ? (
                        <Link target="blank" href={link.link}>
                          {link.name}
                        </Link>
                      ) : (
                        <Link href={link.link}>{link.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800 md:flex-row">
          <p className="font-poppins text-center text-xs font-normal text-black dark:text-white sm:text-sm">
            Copyright Ⓒ 2025 Relief ResQ. All Rights Reserved.
          </p>

          <div className="mt-6 flex flex-row gap-4 md:mt-0">
            <Link href={""}>
              <Instagram />
            </Link>
            <Link href={""}>
              <Twitter />
            </Link>
            <Link href={""}>
              <Facebook />
            </Link>
            <Link href={""}>
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
