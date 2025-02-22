"use client";
import { useEffect, useRef, useState } from "react";
import {
  AppWindow,
  Clapperboard,
  CloudLightning,
  Activity,
  Globe,
  LifeBuoy,
  MessageCircleMore,
} from "lucide-react";
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/terminal";

const HeroTerminal = () => {
  const useIsVisible = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry!.isIntersecting);
        },
        { threshold: 0.1 },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);

    return { ref, isVisible };
  };
  const { ref, isVisible } = useIsVisible();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldAnimate(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      setShouldAnimate(true);
    }
  }, [isVisible]);

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <div ref={ref}>
            {shouldAnimate && (
              <Terminal className="min-w-[90%] sm:w-full">
                <TypingAnimation>
                  &gt; The Fastest ever Disaster Recovery
                </TypingAnimation>
                <AnimatedSpan delay={1500} className="text-green-500">
                  <span>✔ Faster Than Traditional Relief</span>
                </AnimatedSpan>
                <AnimatedSpan delay={2000} className="text-green-500">
                  <span>✔ 100% Transparent and tamper-proof.</span>
                </AnimatedSpan>
                <AnimatedSpan delay={2500} className="text-green-500">
                  <span>✔ Direct to the Needy </span>
                </AnimatedSpan>
                <AnimatedSpan delay={3000} className="text-green-500">
                  <span>✔ Adaptive & Scalable</span>
                </AnimatedSpan>
                <AnimatedSpan delay={3500} className="text-green-500">
                  <span>✔ Crypto & INR Compatibility</span>
                </AnimatedSpan>
                <AnimatedSpan delay={4000} className="text-green-500">
                  <span>✔ Completely Logged Transactions</span>
                </AnimatedSpan>
                <AnimatedSpan delay={4500} className="text-green-500">
                  <span>✔ Fraud-Proof Transactions</span>
                </AnimatedSpan>
                <AnimatedSpan delay={5000} className="text-green-500">
                  <span>✔ SMS Based Emergency</span>
                </AnimatedSpan>
                <AnimatedSpan delay={5500} className="text-green-500">
                  <span>✔ Geolocation-Based Aid Coordination</span>
                </AnimatedSpan>
                <AnimatedSpan delay={6000} className="text-blue-500">
                  <span>ℹ Thank you for using Relief ResQ:</span>
                  <span className="pl-2">- Try it out</span>
                </AnimatedSpan>
                <TypingAnimation delay={6500} className="text-muted-foreground">
                  Success! Project initialized.
                </TypingAnimation>
                <TypingAnimation delay={7000} className="text-muted-foreground">
                  You may now add components.
                </TypingAnimation>
              </Terminal>
            )}
          </div>
        </div>

        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <CloudLightning className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">Fast Emergency Response</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            No waiting for approvals, funds are instantly allocated. So that
            rescue can be assisted immediately without delays
          </p>
        </div>
        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <MessageCircleMore className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">SMS Emergency</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            SMS Messaging so that the user can request for emergency even when
            there is no internet services
          </p>
        </div>

        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <Activity className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">
              Real-Time Medical Assistance
            </p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Instant access to medical professionals and emergency care guidance,
            ensuring immediate support during critical situations.
          </p>
        </div>

        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <Globe className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">Disaster Tracking & Alerts</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Stay updated with real-time disaster alerts and location-based
            warnings to prepare for and respond to emergencies effectively.
          </p>
        </div>

        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <LifeBuoy className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">
              Recovery & Relief Coordination
            </p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Seamless coordination of relief efforts, resource distribution, and
            rehabilitation support for faster post-disaster recovery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroTerminal;
