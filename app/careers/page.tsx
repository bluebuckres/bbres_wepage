"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, IndianRupee, Clock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface JobPosition {
  title: string;
  location: string;
  package: string;
  department: string;
  type: string;
  isNew?: boolean;
  isUrgent?: boolean;
  description: {
    locations?: string[];
    division?: string;
    salary?: string;
    responsibilities: string[];
    requirements: string[];
    howToApply: string;
  };
}

const positions: JobPosition[] = [
  {
    title: "Social Media Manager",
    location: "Kolkata",
    package: "4-12 LPA",
    department: "Marketing",
    type: "Full Time",
    isUrgent: true,
    description: {
      locations: ["Kolkata"],
      division: "Marketing",
      salary: "4-12 LPA",
      responsibilities: [
        "Manage multiple social media accounts across platforms",
        "Execute paid social media campaigns",
        "Track and optimize campaign performance metrics"
      ],
      requirements: [
        "2+ years experience in social media management",
        "Strong understanding of paid social advertising",
        "Experience with social media analytics and reporting"
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"SMM2024\" included in the body of the email. Please include links to social media accounts you've managed."
    },
  },
  {
    title: "Full Stack Web Developer",
    location: "Kolkata",
    package: "6-24 LPA",
    department: "Technology",
    type: "Full Time",
    isUrgent: true,
    description: {
      locations: ["Kolkata"],
      division: "Technology",
      salary: "6-24 LPA",
      responsibilities: [
        "Design and build scalable e-commerce marketplace solutions",
        "Develop and maintain both frontend and backend components",
        "Implement robust payment and transaction systems"
      ],
      requirements: [
        "1+ year of experience in full-stack development OR significant GitHub portfolio",
        "Strong proficiency in React.js/Next.js and Node.js",
        "Experience with e-commerce platforms or marketplace development"
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"FSWD2024\" included in the body of the email. Please include links to your GitHub projects or portfolio."
    },
  },
  {
    title: "Software Engineer",
    location: "Kolkata",
    package: "6-24 LPA",
    department: "Technology",
    type: "Full Time",
    isUrgent: true,
    description: {
      locations: ["Kolkata"],
      division: "Technology",
      salary: "6-24 LPA",
      responsibilities: [
        "Build and optimize high-performance trading systems",
        "Work with cutting-edge technology in a fast-paced environment"
      ],
      requirements: [
        "Strong C++ skills with C++11/14 experience",
        "Expertise in algorithms and system architecture",
        "Experience with Linux and networking"
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"SE2024\" included in the body of the email."
    },
  },
  {
    title: "Data Engineer",
    location: "Kolkata",
    package: "8-24 LPA",
    department: "Technology",
    type: "Full Time",
    description: {
      locations: ["Kolkata"],
      division: "Technology",
      salary: "8-24 LPA",
      responsibilities: [
        "Design and optimize low-latency data processing systems",
        "Implement real-time data handling solutions"
      ],
      requirements: [
        "Strong programming skills in C++ and Python",
        "Experience with real-time data processing",
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"DE2024\" included in the body of the email."
    },
  },
  {
    title: "Quantitative Researcher",
    location: "Kolkata",
    package: "36-60 LPA",
    department: "Research",
    type: "Full Time",
    description: {
      locations: ["Kolkata"],
      division: "Research",
      salary: "36-60 LPA",
      responsibilities: [
        "Design and develop profitable trading strategies",
        "Research and implement quantitative models"
      ],
      requirements: [
        "Strong mathematical and statistical skills",
        "Programming proficiency in C++ and Python",
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"X4413\" included in the body of the email."
    },
  },
  {
    title: "Content Creator",
    location: "Kolkata / Remote",
    package: "3-12 LPA",
    department: "Content",
    type: "Full Time / Part Time",
    description: {
      locations: ["Kolkata", "Remote"],
      division: "Content",
      salary: "3-12 LPA",
      responsibilities: [
        "Create engaging content for trading education",
        "Develop clear, actionable trading tutorials"
      ],
      requirements: [
        "Strong writing and communication skills",
        "Basic understanding of financial markets"
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"CC2024\" included in the body of the email."
    },
  },
  {
    title: "Quant Developer (C++/Python)",
    location: "Kolkata",
    package: "8-24 LPA",
    department: "Development",
    type: "Full Time",
    description: {
      locations: ["Kolkata"],
      division: "Development",
      salary: "8-24 LPA",
      responsibilities: [
        "Design and implement quantitative trading strategies",
        "Develop high-performance trading systems"
      ],
      requirements: [
        "Strong proficiency in C++ and Python",
        "Experience with numerical computing",
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"QD2024\" included in the body of the email."
    },
  },
  {
    title: "Video Editor",
    location: "Kolkata / Remote",
    package: "Based on experience",
    department: "Content",
    type: "Full Time / Part Time",
    isNew: true,
    description: {
      locations: ["Kolkata", "Remote"],
      division: "Content",
      salary: "Based on experience",
      responsibilities: [
        "Edit educational trading videos",
        "Create engaging social media content"
      ],
      requirements: [
        "Proficiency in Premier Pro/Final Cut Pro",
        "Experience with After Effects",
        "Strong visual storytelling skills"
      ],
      howToApply: "Send your resume to careers@bluebuckresearch.com with the unique string \"VE2024\" included in the body of the email."
    },
  },
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Ensure hydration complete
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleJobDetails = (title: string) => {
    setExpandedJob(expandedJob === title ? null : title);
  };

  const groupedPositions = positions.reduce((acc, position) => {
    if (!acc[position.department]) {
      acc[position.department] = [];
    }
    acc[position.department].push(position);
    return acc;
  }, {} as Record<string, JobPosition[]>);

  return (
    <div className="relative isolate overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2645] via-[#0A1525] to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(14,164,233,0.05)_50%,transparent_75%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(14,164,233,0.05)_0px,rgba(14,164,233,0.05)_1px,transparent_1px,transparent_80px)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(14,164,233,0.05)_0px,rgba(14,164,233,0.05)_1px,transparent_1px,transparent_80px)]" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,164,233,0.2)_0%,transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_0%,transparent_40%,transparent_60%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="container mx-auto py-12 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-[#0ea4e9] to-white break-words">Careers @ BlueBuck</h1>
            
            <div className="mb-12">
              <div className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/95 via-[#0A1525]/98 to-black border border-white/10 relative overflow-hidden">
                {/* Accent lines with animation */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent animate-gradient-x" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent animate-gradient-x-reverse" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent animate-gradient-y" />
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent animate-gradient-y" />
                </div>
                
                <div className="relative space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl font-medium text-gray-200"
                  >
                    As a bootstrapped trading and investment firm, we focus on what truly matters: performance. Our culture strips away unnecessary corporate elements to prioritize results.
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg text-[#0ea4e9] font-medium"
                  >
                    No suits. No endless presentations. No bureaucracy.
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-gray-300"
                  >
                    What matters here is the quality of your work. Your contributions directly impact both the company's bottom line and your compensation. At BlueBuck, everyone thinks and acts like an owner.
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-lg font-medium text-gray-200"
                  >
                    We're continuously seeking exceptional talent. If you thrive in a high-performance, collaborative environment where results speak louder than titles, we want to hear from you.
                  </motion.div>
                </div>

                {/* Premium background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F2645]/50 via-[#0A1525]/60 to-black/70 opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.1),transparent_70%)]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24"
          >
            <div className="text-center mb-16 relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.1),transparent_60%)]" />
              
              {/* Title with gradient and glow */}
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#0ea4e9] to-white relative">
                  Open Positions
                </span>
                {/* Underline effect */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
              </motion.h2>
              
              {/* Subtitle with glow */}
              <motion.p 
                className="mt-8 text-lg text-gray-400 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join our team of exceptional individuals
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.05)_0%,transparent_70%)]" />
              </motion.p>
            </div>

            {Object.entries(groupedPositions).map(([department, departmentPositions], deptIndex) => (
              <motion.div 
                key={department} 
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * deptIndex }}
              >
                <h3 className="text-2xl font-bold mb-8 text-white relative pl-4 border-l-4 border-[#0ea4e9] group">
                  {/* Department title glow effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(14,164,233,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {department}
                </h3>
                <div className="grid gap-8">
                  {departmentPositions.map((position, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="transform transition-all duration-300"
                    >
                      <Card className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 hover:border-[#0ea4e9]/50 transition-all duration-300">
                        <div className="p-6">
                          {/* Job Header */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex-grow space-y-4">
                              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-xl font-semibold text-white">{position.title}</h4>
                                  {position.isNew && (
                                    <div className="relative">
                                      <span className="absolute -inset-3 bg-[#0ea4e9]/20 blur-lg rounded-full"></span>
                                      <span className="relative px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#0ea4e9] to-blue-600 text-white rounded-full border border-[#0ea4e9]/50 animate-badge-glow">
                                        New Opening
                                      </span>
                                    </div>
                                  )}
                                  {position.isUrgent && (
                                    <div className="relative">
                                      <span className="absolute -inset-3 bg-red-500/20 blur-lg rounded-full"></span>
                                      <span className="relative px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full border border-red-500/50 animate-urgent-badge">
                                        Immediate Opening
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-gray-300">
                                  <div className="p-2 rounded-full bg-white/5">
                                    <MapPin className="h-5 w-5 text-[#0ea4e9]" />
                                  </div>
                                  <span>{position.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                  <div className="p-2 rounded-full bg-white/5">
                                    <Clock className="h-5 w-5 text-[#0ea4e9]" />
                                  </div>
                                  <span>{position.type}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                  <div className="p-2 rounded-full bg-white/5">
                                    <IndianRupee className="h-5 w-5 text-[#0ea4e9]" />
                                  </div>
                                  <span>{position.package}</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="outline"
                              className="mt-4 md:mt-0 md:ml-4 border-[#0ea4e9] text-[#0ea4e9] hover:bg-[#0ea4e9] hover:text-white transition-colors duration-300"
                              onClick={() => toggleJobDetails(position.title)}
                            >
                              <ChevronDown 
                                className={`h-5 w-5 transition-transform duration-300 ${
                                  expandedJob === position.title ? 'rotate-180' : ''
                                }`}
                              />
                            </Button>
                          </div>

                          {/* Expandable Content */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                              height: expandedJob === position.title ? "auto" : 0,
                              opacity: expandedJob === position.title ? 1 : 0
                            }}
                            transition={{
                              height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
                              opacity: { duration: 0.2, delay: expandedJob === position.title ? 0.1 : 0 }
                            }}
                            className="overflow-hidden"
                          >
                            <div className={`mt-6 pt-6 border-t border-white/10 ${expandedJob === position.title ? 'block' : 'hidden'}`}>
                              {/* Additional Details Section */}
                              <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                              >
                                {(position.description.division || position.description.locations || position.description.salary) && (
                                  <div className="mb-6">
                                    <h5 className="text-lg font-semibold text-white mb-3">Additional Details</h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {position.description.division && (
                                        <div>
                                          <span className="text-gray-400">Division:</span>
                                          <p className="text-white">{position.description.division}</p>
                                        </div>
                                      )}
                                      {position.description.locations && (
                                        <div>
                                          <span className="text-gray-400">Locations:</span>
                                          <p className="text-white">{position.description.locations.join(", ")}</p>
                                        </div>
                                      )}
                                      {position.description.salary && (
                                        <div>
                                          <span className="text-gray-400">Salary:</span>
                                          <p className="text-white">{position.description.salary}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </motion.div>

                              {/* Responsibilities Section */}
                              <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                              >
                                {position.description.responsibilities && (
                                  <div className="mb-6">
                                    <h5 className="text-lg font-semibold text-white mb-3">Responsibilities</h5>
                                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                                      {position.description.responsibilities.map((resp, idx) => (
                                        <li key={idx}>{resp}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>

                              {/* Requirements Section */}
                              <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                              >
                                {position.description.requirements && (
                                  <div className="mb-6">
                                    <h5 className="text-lg font-semibold text-white mb-3">Requirements</h5>
                                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                                      {position.description.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>

                              {/* How To Apply Section */}
                              <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                              >
                                {position.description.howToApply && (
                                  <div className="mb-6">
                                    <h5 className="text-lg font-semibold text-white mb-3">How To Apply</h5>
                                    <p className="text-gray-300">{position.description.howToApply}</p>
                                  </div>
                                )}
                              </motion.div>

                              {/* Action Buttons */}
                              <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                              >
                                <div className="flex gap-4">
                                  <Button 
                                    variant="default"
                                    className="bg-[#0ea4e9] hover:bg-[#0284c7] text-white"
                                    onClick={() => {
                                      if (position.title === "Software Engineer") {
                                        router.push("/careers/software-engineer");
                                      } else if (position.title === "Full Stack Web Developer") {
                                        router.push("/careers/full-stack-developer");
                                      } else if (position.title === "Social Media Manager") {
                                        router.push("/careers/social-media-manager");
                                      } else if (position.title === "Quantitative Researcher") {
                                        router.push("/careers/quantitative-researcher");
                                      } else if (position.title === "Data Engineer") {
                                        router.push("/careers/data-engineer");
                                      } else if (position.title === "Content Creator") {
                                        router.push("/careers/content-creator");
                                      } else if (position.title === "Video Editor") {
                                        router.push("/careers/video-editor");
                                      }
                                    }}
                                  >
                                    View Full Details
                                  </Button>
                                  <Button 
                                    className="bg-[#0ea4e9] text-white hover:bg-[#0ea4e9]/90 transition-colors duration-300"
                                    onClick={() => {
                                      let emailId = "";
                                      if (position.title === "Software Engineer") {
                                        emailId = "SE2024";
                                      } else if (position.title === "Full Stack Web Developer") {
                                        emailId = "FSWD2024";
                                      } else if (position.title === "Social Media Manager") {
                                        emailId = "SMM2024";
                                      } else if (position.title === "Quantitative Researcher") {
                                        emailId = "X4413";
                                      } else if (position.title === "Data Engineer") {
                                        emailId = "DE2024";
                                      } else if (position.title === "Content Creator") {
                                        emailId = "CC2024";
                                      } else if (position.title === "Video Editor") {
                                        emailId = "VE2024";
                                      }
                                      window.location.href = `mailto:careers@bluebuckresearch.com?subject=Application for ${position.title}&body=${emailId}`;
                                    }}
                                  >
                                    Apply Now
                                  </Button>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <div className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/95 via-[#0A1525]/98 to-black border border-white/10 relative overflow-hidden">
              {/* Accent lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
              </div>
              
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Title with gradient */}
                  <h3 className="text-3xl font-bold relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#0ea4e9] to-white">
                      Submit Your Profile
                    </span>
                    {/* Underline effect */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                  </h3>

                  {/* Subtitle with gradient glow */}
                  <div className="text-gray-300 max-w-2xl relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.1),transparent_70%)]" />
                    <span className="relative">
                      Take the next step in your career. Join our team of innovators and problem-solvers.
                    </span>
                  </div>

                  {/* Email button with hover effect */}
                  <a 
                    href="mailto:careers@bluebuckresearch.com"
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#0F2645] to-[#0A1525] rounded-lg border border-[#0ea4e9]/20 hover:border-[#0ea4e9]/50 transition-all duration-300"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.2)_0%,transparent_70%)]" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative flex items-center space-x-3">
                      <span className="text-[#0ea4e9]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <span className="font-semibold text-white group-hover:text-[#0ea4e9] transition-colors duration-300">
                        careers@bluebuckresearch.com
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
