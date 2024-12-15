"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const jobDetails = {
  title: "Full Stack Web Developer",
  location: "Kolkata",
  division: "Technology",
  salary: "6-24 LPA",
  responsibilities: [
    "Design and build scalable e-commerce marketplace solutions",
    "Develop and maintain both frontend and backend components",
    "Implement robust payment and transaction systems",
    "Optimize application performance and user experience",
    "Work closely with product and design teams",
    "Write clean, maintainable, and efficient code"
  ],
  requirements: [
    "1+ year of experience in full-stack development OR significant GitHub portfolio",
    "Strong proficiency in React.js/Next.js and Node.js",
    "Experience with e-commerce platforms or marketplace development",
    "Solid understanding of system design principles and microservices",
    "Proficiency in modern JavaScript/TypeScript",
    "Experience with RESTful APIs and GraphQL",
    "Knowledge of SQL and NoSQL databases",
    "Understanding of cloud services (AWS/GCP)",
    "Version control with Git",
    "Strong problem-solving skills and attention to detail",
    "Passion for learning new technologies",
    "Entrepreneurial mindset with strong drive for success"
  ],
  applicationProcess: "Send your resume to careers@bluebuckresearch.com with the unique string \"FSWD2024\" included in the body of the email. Please include links to your GitHub projects or portfolio.",
};

export default function FullStackDeveloperPage() {
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

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-white">{jobDetails.title}</h1>
            <div className="relative">
              <span className="absolute -inset-3 bg-red-500/20 blur-lg rounded-full"></span>
              <span className="relative px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full border border-red-500/50 animate-urgent-badge">
                Ultra Urgent
              </span>
            </div>
          </div>

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
                  window.location.href = `mailto:careers@bluebuckresearch.com?subject=Application for ${jobDetails.title}&body=FSWD2024`;
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
