"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const jobDetails = {
  title: "Quantitative Researcher",
  location: "Kolkata",
  division: "Research",
  salary: "36-60 LPA",
  responsibilities: [
    "Design and develop profitable automated trading strategies",
    "Research and implement sophisticated quantitative models",
    "Analyze market data and identify trading opportunities",
    "Optimize existing strategies for maximum performance",
    "Collaborate with developers to implement trading systems",
    "Stay updated with latest market trends and research"
  ],
  requirements: [
    "Strong mathematical and statistical background",
    "3+ years of experience in algorithmic trading",
    "Proficiency in C++ and Python",
    "Deep understanding of financial markets and instruments",
    "Experience with machine learning and statistical modeling",
    "Excellent analytical and problem-solving skills",
    "Track record of successful strategy development",
    "Passion to become a multi-millionaire",
    "Ability to work in a fast-paced trading environment"
  ],
  applicationProcess: "Send your resume to careers@bluebuckresearch.com with the unique string \"X4413\" included in the body of the email.",
};

export default function QuantitativeResearcherPage() {
  const router = useRouter();

  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0A1525] to-[#0F2645]"></div>
      <div className="container mx-auto py-12 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => router.push("/careers")}
            className="inline-flex items-center text-[#0ea4e9] hover:text-[#0284c7] mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </button>

          <h1 className="text-4xl font-bold mb-6 text-white">{jobDetails.title}</h1>

          <div className="grid gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-2 text-white">Location</h3>
                <p className="text-gray-300">{jobDetails.location}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-2 text-white">Division</h3>
                <p className="text-gray-300">{jobDetails.division}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-2 text-white">Salary</h3>
                <p className="text-gray-300">{jobDetails.salary}</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {jobDetails.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {jobDetails.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">How to Apply</h2>
              <p className="text-gray-300 mb-6">{jobDetails.applicationProcess}</p>
              <Button 
                variant="default"
                className="bg-[#0ea4e9] hover:bg-[#0284c7] text-white"
                onClick={() => {
                  window.location.href = `mailto:careers@bluebuckresearch.com?subject=Application for ${jobDetails.title}&body=X4413`;
                }}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
