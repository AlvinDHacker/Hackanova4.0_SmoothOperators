import React from "react";
import { Badge } from "~/components/ui/badge";
import { LineShadowText } from "~/components/ui/line-shadow-text";
import { IconCloud } from "~/components/ui/icon-cloud";
import { AnimatedListDemo } from "~/components/ui/AnimatedListDemo";
import HeroTerminal from "~/components/HeroTerminal";
import DonorLogin from "~/components/Login/DonorLogin";
import MainLogin from "~/components/Login/MainLogin";
import { Button } from "~/components/ui/button";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import DemoButtons from "~/components/DemoButtons";
import { EvervaultCard, Icon } from "~/components/ui/evervault-card";
import { ConfettiButton } from "~/components/ui/confetti";
import Testimonials from "~/components/Testimonials";
import CTA from "~/components/CTA";
import Footer from "~/components/Footer";

const slugs = [
  // Blockchain & Crypto
  "solana",
  "ethereum",
  "bitcoin",
  "rust",
  "walletconnect",
  "blockchaindotcom",
  "tether",
  "bnbchain",
  "web3dotjs",
  "ethers",
  "dogecoin",
  "litecoin",
  "solidity",
  "polygon",
  "near",
  "stellar",
  "polkadot",
  "xrp",
  "sui",

  // Web3 & DeFi
  "web3",
  "opensea",
  "uniswap",
  "chainlink",
  "coinbase",
  "binance",
  "coinmarketcap",
];

const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
);

export default async function Home() {
    if (typeof document !== 'undefined') {
      const drive = driver();
      drive.highlight({
        element: "#showdemo",
        popover: {
          title: "Take A Demo With Us",
          description: "a detailed explanation on how to use Relief ResQ"
        }
      });
    }
  return (
    <div>
      <>
        <section
          id="home"
          className={`flex flex-col py-6 sm:py-16 md:flex-row`}
        >
          <div
            className={`flex flex-1 flex-col items-start justify-center px-6 sm:px-16 xl:px-0`}
          >
            <div className="bg-discount-gradient mb-2 flex flex-row items-center rounded-[10px] px-4 py-[6px]"></div>

            <div className="mx-auto w-full sm:w-[80%]">
              <Badge className={`font-poppins mb-4 ml-2 text-sm font-normal`}>
                <span>Transparent. Swift. Corruption-Free</span>
              </Badge>
              <div className="flex flex-row items-center justify-between">
                <div className="font-poppins flex-1 text-5xl font-semibold text-black dark:text-white sm:text-7xl">
                  <LineShadowText
                    className="text-green-800 dark:text-green-500"
                    shadowColor={"black"}
                  >
                    Instant
                  </LineShadowText>{" "}
                  Aid, <br className="hidden sm:block" />{" "}
                  <LineShadowText
                    className="text-green-800 dark:text-green-500"
                    shadowColor={"black"}
                  >
                    Zero
                  </LineShadowText>{" "}
                  Delays
                </div>
              </div>
              <p className={`font-poppins my-5`}>
                When disaster strikes, every second counts. Our
                blockchain-powered emergency relief system ensures instant,
                tamper-proof fund disbursement directly to those in need. With
                real-time tracking, fraud prevention, and decentralized identity
                (DID) verification, we bring speed, security, and transparency
                to aid distribution in rural India.
              </p>

              {/* <div className="flex items-center">
                <MainLogin />
                <Button id = "showdemo" variant="outline">Show Demo</Button>
              </div> */}
              <DemoButtons />
            </div>
          </div>

          <div
            className={`relative my-10 flex flex-1 items-center justify-center md:my-0`}
          >
            <img
              src={"earth.png"}
              alt="hero img"
              className="relative z-[5] h-[100%] w-[90%]"
            />

            {/* gradient start */}
            <div className="pink__gradient absolute top-0 z-[0] h-[35%] w-[40%]" />
            <div className="white__gradient absolute bottom-40 z-[1] h-[80%] w-[80%] rounded-full" />
            <div className="blue__gradient absolute bottom-20 right-20 z-[0] h-[50%] w-[50%]" />
            {/* gradient end */}
          </div>
        </section>
        <section className="mx-auto w-[90%]">
          <div className="mb-6 flex flex-col items-center justify-between text-black dark:text-white sm:mb-16">
            <h2 className="font-poppins mb-3 w-full text-3xl font-semibold">
              What do we do ?
            </h2>
            <div className="mt-6 w-full md:mt-0">
              <p className="font-poppins text-dimWhite text-md mb-3 text-left font-normal">
                We revolutionize disaster relief using blockchain, AI, and
                decentralized identity (DID) solutions to ensure that funds
                reach the right hands faster
              </p>
              <p className="font-poppins text-dimWhite text-md text-left font-normal">
                Real-Time Disaster Detection: AI-driven monitoring to identify
                and verify disasters as they happen. Smart Contracts for Instant
                Aid: Automated fund disbursement with zero bureaucratic delays.
                Immutable Tracking: Every rupee spent is recorded on the
                blockchain for 100% transparency. Fraud-Proof Transactions:
                Vendors and NGOs are verified with decentralized identity (DID)
                to prevent fund misuse. Geolocation-Based Aid Coordination:
                Pinpointing disaster zones and matching them with verified local
                responders.
              </p>
            </div>
          </div>
          <h2 className="font-poppins mb-4 mt-10 w-full text-3xl font-semibold">
            Our Main Features
          </h2>

          <HeroTerminal />

          <div className="grid-cols-2 gap-7 pb-5 md:grid">
            <div className="col-span-1">
              <h2 className="font-poppins mb-4 mt-10 w-full text-3xl font-semibold">
                We&apos;re trained for anything
              </h2>
              <div className="mt-6 w-full">
                <p className="font-poppins text-dimWhite text-md mb-6 max-w-[450px] text-left font-normal">
                  Join the Revolution in Disaster Relief <br /> Be a donor,
                  volunteer, or partner in rebuilding lives with trust and
                  efficiency. <br />
                  Not just this we even have top notch security
                </p>
              </div>
              <ConfettiButton>Explore 🎉</ConfettiButton>
            </div>
            <div className="relative flex size-full items-center justify-center overflow-hidden">
              <IconCloud images={images} />
            </div>
            {/* <div className="relative mx-auto flex h-[30rem] max-w-sm flex-col items-start border border-black/[0.2] p-4 dark:border-white/[0.2]">
              <Icon className="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
              <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
              <Icon className="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
              <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

              <EvervaultCard text="hover" />

              <h2 className="mt-4 text-sm font-light text-black dark:text-white">
                Hover over this card to reveal an awesome effect. Running out of
                copy here.
              </h2>
              <p className="mt-4 rounded-full border border-black/[0.2] px-2 py-0.5 text-sm font-light text-black dark:border-white/[0.2] dark:text-white">
                Watch me hover
              </p>
            </div> */}
          </div>

          <div className="mx-auto grid-cols-2 gap-7 pb-16 md:mb-16 md:grid">
            <div className="hidden sm:block">
              <AnimatedListDemo />
            </div>
            <div className="mb-6 flex flex-col items-center justify-between text-black dark:text-white sm:mb-16">
              <div className="my-auto">
                <h2 className="font-poppins mb-3 w-full text-3xl font-semibold">
                  How it Works ?
                </h2>
                <div className="mt-6 w-full md:mt-0">
                  <ul className="font-poppins text-dimWhite text-md mb-6 space-y-2 text-left font-normal">
                    <li>
                      1️⃣ AI scrapes real-time disaster news & verifies it with
                      on-ground sources.
                    </li>
                    <li>
                      2️⃣ NGOs confirm the crisis & estimate aid requirements.
                    </li>
                    <li>
                      3️⃣ Funds are auto-released via smart contracts to verified
                      NGOs & vendors.
                    </li>
                    <li>
                      4️⃣ Vendors supply aid & submit proofs (bills, GPS-stamped
                      images, videos).
                    </li>
                    <li>
                      5️⃣ All transactions are logged on blockchain for full
                      transparency & accountability.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="block sm:hidden">
              <AnimatedListDemo />
            </div>
          </div>
        </section>
      </>
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
