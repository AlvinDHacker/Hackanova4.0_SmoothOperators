"use client";
import { useEffect, useRef, useState } from "react";
import {
  AppWindow,
  Clapperboard,
  Coins,
  ExternalLink,
  FilePieChart,
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
                  &gt; The Next Generation Finance Solution
                </TypingAnimation>
                <AnimatedSpan delay={1500} className="text-green-500">
                  <span>✔ Document Analysis and Insights</span>
                </AnimatedSpan>
                <AnimatedSpan delay={2000} className="text-green-500">
                  <span>✔ Interactive Video Integration</span>
                </AnimatedSpan>
                <AnimatedSpan delay={2500} className="text-green-500">
                  <span>✔ Graph and Chart Generation</span>
                </AnimatedSpan>
                <AnimatedSpan delay={3000} className="text-green-500">
                  <span>✔ Tax Optimization Suggestions</span>
                </AnimatedSpan>
                <AnimatedSpan delay={3500} className="text-green-500">
                  <span>✔ Collaborative Financial Review</span>
                </AnimatedSpan>
                <AnimatedSpan delay={4000} className="text-green-500">
                  <span>✔ Expense Categorization and Analysis</span>
                </AnimatedSpan>
                <AnimatedSpan delay={4500} className="text-green-500">
                  <span>✔ Smart Querying with Contextual AI</span>
                </AnimatedSpan>
                <AnimatedSpan delay={5000} className="text-green-500">
                  <span>✔ PDF Extension for Browsers</span>
                </AnimatedSpan>
                <AnimatedSpan delay={5500} className="text-green-500">
                  <span>✔ Data Privacy and Security</span>
                </AnimatedSpan>
                <AnimatedSpan delay={6000} className="text-blue-500">
                  <span>ℹ Thank you for using Finnovate AI:</span>
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
            <AppWindow className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">Chrome Extension</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            We simplify the process by enabling users to ask questions directly
            about online PDFs.
          </p>
        </div>
        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <Clapperboard className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">Upload Videos</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Upload financial videos or presentations and interact with the
            content through chat-based questions and answers.
          </p>
        </div>

        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <FilePieChart className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">Graph & Chart Generation</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Visualize spending patterns, revenue trends, and financial metrics
            through automatically generated graphs and charts.
          </p>
        </div>
        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <Coins className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">Tax Optimization</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Get personalized tax-saving strategies and recommendations tailored
            to institutional finance needs.
          </p>
        </div>
        <div className="flex max-w-[370px] flex-col justify-between rounded-2xl bg-gray-200 p-6 text-black shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center gap-3">
            <MessageCircleMore className="h-6 w-6 text-green-500" />
            <p className="text-lg font-semibold">Collaborative Reviews</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Multiple team members can collaborate on financial documents, leave
            comments, and discuss insights in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroTerminal;
