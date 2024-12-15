"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const jobDetails = {
  title: "Social Media Manager",
  location: "Kolkata",
  division: "Marketing",
  salary: "2-6 LPA",
  responsibilities: [
    "Manage and grow multiple social media accounts across platforms (Twitter, LinkedIn, Instagram, etc.)",
    "Plan and execute paid social media campaigns (Meta Ads, Twitter Ads, Google Ads)",
    "Track and optimize campaign performance metrics (CPC, ROAS, CTR)",
    "Generate and nurture quality leads through social media channels",
    "Create and maintain content calendars for multiple accounts",
    "Analyze social media metrics and prepare performance reports",
    "Monitor industry trends and competitor activities",
    "Collaborate with content team for creating engaging social media content",
    "Implement social media best practices and maintain brand consistency"
  ],
  requirements: [
    "2+ years experience in social media management and digital marketing",
    "Proven track record of managing multiple social media accounts simultaneously",
    "Strong understanding of paid social advertising (Meta, Twitter, Google Ads)",
    "Experience with social media analytics and reporting tools",
    "Knowledge of digital marketing metrics (CPC, ROAS, CPL, CTR)",
    "Proficiency in lead generation and nurturing through social channels",
    "Experience with social media management tools (Buffer, Hootsuite, etc.)",
    "Understanding of SEO and content marketing principles",
    "Excellent communication and copywriting skills",
    "Strong analytical and problem-solving abilities",
    "Up-to-date with latest social media trends and best practices",
    "Basic understanding of graphic design tools is a plus"
  ],
  applicationProcess: "Send your resume to careers@bluebuckresearch.com with the unique string \"SMM2024\" included in the body of the email. Please include links to social media accounts you've managed and examples of successful campaigns.",
};

export default function SocialMediaManagerPage() {
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
                Immediate Opening
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
                  window.location.href = `mailto:careers@bluebuckresearch.com?subject=Application for ${jobDetails.title}&body=SMM2024`;
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
