"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const jobDetails = {
  title: "Quant Developer (C++/Python)",
  location: "Kolkata",
  division: "Development",
  salary: "8-24 LPA (Based on experience)",
  overview: "We're seeking an exceptional Quant Developer to join our algorithmic trading team. You'll build high-performance systems that transform mathematical models into profitable trading strategies.",
  responsibilities: [
    "Design and implement quantitative trading strategies",
    "Develop high-performance trading systems",
    "Create data analysis pipelines and backtesting frameworks",
    "Collaborate with traders to implement strategies",
    "Optimize execution algorithms for maximum efficiency"
  ],
  technicalRequirements: [
    "Strong proficiency in C++ and Python",
    "Experience with numerical computing and optimization",
    "Understanding of financial markets and trading",
    "Knowledge of data structures and algorithms",
    "Experience with real-time systems"
  ],
  additionalSkills: [
    "Strong mathematical and analytical skills",
    "Experience with performance optimization",
    "Interest in financial markets and trading",
    "Excellence in problem-solving under time constraints",
    "Strong communication skills"
  ],
  niceToHave: [
    "Experience with quantitative finance or algorithmic trading",
    "Knowledge of market microstructure",
    "Familiarity with machine learning",
    "Experience with real-time systems"
  ],
  applicationProcess: "Send your resume to careers@bluebuckresearch.com with the unique string \"QD2024\" included in the body of the email.",
};

export default function QuantDeveloperPage() {
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
                <h3 className="text-lg font-semibold mb-2 text-white">Compensation</h3>
                <p className="text-gray-300">{jobDetails.salary}</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Role Overview</h2>
              <p className="text-gray-300">{jobDetails.overview}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Core Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {jobDetails.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Technical Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {jobDetails.technicalRequirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">What Sets You Apart</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {jobDetails.additionalSkills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-white">Nice to Have</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {jobDetails.niceToHave.map((item, index) => (
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
                  window.location.href = `mailto:careers@bluebuckresearch.com?subject=Application for ${jobDetails.title}&body=QD2024`;
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
