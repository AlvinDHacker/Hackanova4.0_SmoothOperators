// types/index.ts
export interface FeedbackItem {
    id: string;
    content: string;
    name: string;
    title: string;
    img: string;
  }
  
  // data/feedback.ts
  export const feedback: FeedbackItem[] = [
    {
      id: "feedback-1",
      content:
        "This platform has revolutionized emergency response. Instant fund allocation and real-time alerts ensure help arrives when it’s needed the most.",
      name: "Herman Jensen",
      title: "Disaster Relief Coordinator",
      img: "/people01.png",
    },
    {
      id: "feedback-2",
      content:
        "Real-time medical assistance has been a lifesaver. Having instant access to professionals during emergencies has drastically improved response times.",
      name: "Steve Mark",
      title: "Emergency Medical Specialist",
      img: "/people02.png",
    },
    {
      id: "feedback-3",
      content:
        "Coordinating relief efforts has never been easier! The seamless communication tools help teams stay organized and respond faster to disasters.",
      name: "Kenn Gallagher",
      title: "Humanitarian Aid Director",
      img: "/people03.png",
    },
  ];

  
  // components/Testimonials.tsx
  import { FC } from "react";
  import FeedbackCard from "~/components/FeedbackCard";
  
  const Testimonials: FC = () => (
    <section
      id="clients"
      className="sm:py-16 py-6 flex justify-center items-center flex-col relative"
    >
      {/* Gradient Background */}
  
      {/* Header Section */}
      <div className="w-[90%] mx-auto text-black dark:text-white flex justify-between items-center flex-col sm:mb-16 mb-6">
        <h2 className="font-poppins font-semibold text-3xl mb-3 w-full">
          What People say about us
        </h2>
        <div className="w-full md:mt-0 mt-6">
          <div className="font-poppins font-normal text-dimWhite text-md text-left max-w-[450px]">
            You didn&apos;t hear it from us ... <br />
            Listen to what our users have said about us
          </div>
        </div>
      </div>
  
      {/* Testimonials Cards */}
      <div className="flex flex-wrap sm:justify-start justify-center w-[90%] mx-auto feedback-container relative z-[1]">
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
  
  export default Testimonials;
  