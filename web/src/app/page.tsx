import React from "react";
import { Badge } from "~/components/ui/badge";
import { LineShadowText } from "~/components/ui/line-shadow-text";
import { IconCloud } from "~/components/ui/icon-cloud";
import { AnimatedListDemo } from "~/components/ui/AnimatedListDemo";
import HeroTerminal from "~/components/HeroTerminal";
import DonorLogin from "~/components/Login/DonorLogin";

const slugs = [
  "paypal",
  "visa",
  "mastercard",
  "stripe",
  "americanexpress",
  "chase",
  "citibank",
  "hdfcbank",
  "monero",
  "amex",
  "barclays",
  "allianz",
  "metlife",
  "prudential",
  "phonepe",
  "fineco",
  "interactjs",
  "instapaper",
  "robinhood",
  "etrade",
  "wealthfront",
  "betterment",
  "sofi",
  "stash",
  "acorns",
  "mint",
  "plaid",
  "affirm",
  "klarna",
  "afterpay",
  "zelle",
  "venmo",
  "cashapp",
  "alipay",
  "wechatpay",
  "googlepay",
  "applepay",
  "samsungpay",
  "revolut",
];

const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
);

export default async function Home() {
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
                <span>Take Control of your Finances</span>
              </Badge>
              <div className="flex flex-row items-center justify-between">
                <div className="font-poppins flex-1 text-5xl font-semibold text-black dark:text-white sm:text-7xl">
                  The Next <br className="hidden sm:block" />{" "}
                  <LineShadowText
                    className="text-green-800"
                    shadowColor={"black"}
                  >
                    Generation
                  </LineShadowText>{" "}
                  <br />
                  Finance Chatbot
                </div>
              </div>
              <p className={`font-poppins my-5`}>
                Finnovate AI simplifies financial management by providing
                intelligent insights, interactive analysis, and real-time
                querying of financial documents and data.
              </p>

              <DonorLogin />
            </div>
          </div>

          <div
            className={`relative my-10 flex flex-1 items-center justify-center md:my-0`}
          >
            <img
              src={"robot.png"}
              alt="billing"
              className="relative z-[5] h-[100%] w-[100%]"
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
                Finnovate AI is a domain-specific, AI-powered financial
                management platform designed to revolutionize how organizations
                manage their finances.
              </p>
              <p className="font-poppins text-dimWhite text-md text-left font-normal">
                We are basically a chatbot on steriods which helps you for all
                things finance.. Our unique features help you get a response in
                graphs and charts which help you visualize better... Not only
                that as a chatbot we even analyse youtube videos and answer your
                questions based on it...
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
                We&apos;ve trained for everything on Finance
              </h2>
              <div className="mt-6 w-full">
                <p className="font-poppins text-dimWhite text-md mb-6 max-w-[450px] text-left font-normal">
                  From saving and investing to budgeting and wealth management,
                  we cover every aspect of finance to help you make informed
                  decisions and secure your financial future.
                </p>
              </div>
              {/* <Authenticated>
              <Link href={"/dashboard"}>
                <ConfettiButton className="gap-3">
                  Try it out <ExternalLink />
                </ConfettiButton>
              </Link>
            </Authenticated>
            <Unauthenticated>
              <Button>
                <SignInButton />
              </Button>
            </Unauthenticated> */}
            </div>
            <div className="relative flex size-full items-center justify-center overflow-hidden">
              <IconCloud images={images} />
            </div>
          </div>

          <div className="mx-auto grid-cols-2 gap-7 pb-16 md:mb-16 md:grid">
            <div className="hidden sm:block">
              <AnimatedListDemo />
            </div>
            <div className="mb-6 flex flex-col items-center justify-between text-black dark:text-white sm:mb-16">
              <div className="my-auto">
                <h2 className="font-poppins mb-3 w-full text-3xl font-semibold">
                  What do we answer ?
                </h2>
                <div className="mt-6 w-full md:mt-0">
                  <p className="font-poppins text-dimWhite text-md mb-6 text-left font-normal">
                    Finnovate AI answers complex financial questions by
                    analyzing documents, generating insights, and providing
                    clear explanations in real-time. Whether it&apos;s
                    understanding financial reports, identifying cost-saving
                    opportunities, or visualizing spending patterns, Finnovate
                    delivers accurate, context-aware answers, making financial
                    decision-making easier and more efficient.
                  </p>
                </div>
                {/* <Authenticated>
                <Link href={"/dashboard/websearch"}>
                  <Button className="gap-3">
                    Answer a Question <ExternalLink />
                  </Button>
                </Link>
              </Authenticated>
              <Unauthenticated>
                <Button>
                  <SignInButton />
                </Button>
              </Unauthenticated> */}
              </div>
            </div>
            <div className="block sm:hidden">
              <AnimatedListDemo />
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
