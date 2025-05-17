"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const mailtoLink = `mailto:connect@bluebuckresearch.com?subject=Message from ${name}&body=From: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="relative isolate overflow-hidden min-h-screen">
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

      <div className="container mx-auto py-16 px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#0ea4e9] to-white">
                Let's Meet Over Coffee
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
            </h1>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Have ideas to discuss? We'd love to chat over a cup of coffee. Reach out to us through any of the channels below.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/80 via-[#0A1525]/90 to-black/95 backdrop-blur-lg border border-white/10 relative overflow-hidden"
            >
              {/* Accent lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
              </div>

              <div className="relative space-y-8">
                {/* Address Section */}
                <div className="group">
                  <h3 className="text-xl font-semibold mb-4 text-white flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-[#0ea4e9]" />
                    <span>Our Location</span>
                  </h3>
                  <div className="pl-7">
                    <address className="not-italic text-gray-300 leading-relaxed">
                      BlueBuck Research<br />
                      4G KrishtiKunja, Kaikhali Main Road,<br />
                      Near Muthoot Finance,<br />
                      Airport, Kolkata, India
                    </address>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
                  
                  <a href="tel:+917908158639" 
                    className="group flex items-center space-x-3 p-3 rounded-lg bg-[#0F2645]/50 hover:bg-[#0F2645] transition-all duration-300"
                  >
                    <Phone className="h-5 w-5 text-[#0ea4e9]" />
                    <span className="text-gray-300 group-hover:text-[#0ea4e9] transition-colors duration-300">
                      +91-7908158639
                    </span>
                  </a>

                  <a href="mailto:connect@bluebuckresearch.com"
                    className="flex items-center gap-2 px-6 py-4 text-lg text-blue-400 bg-[#0B1221] rounded-lg hover:bg-[#0f1729] transition-colors duration-200"
                  >
                    <Mail className="flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      connect@bluebuckresearch.com
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 rounded-lg bg-gradient-to-br from-[#0F2645]/80 via-[#0A1525]/90 to-black/95 backdrop-blur-lg border border-white/10 relative overflow-hidden"
            >
              {/* Accent lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0ea4e9] to-transparent" />
              </div>

              <div className="relative">
                <h3 className="text-xl font-semibold mb-6 text-white">Send us a Message</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-3 bg-[#0F2645]/50 border border-[#0ea4e9]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0ea4e9]/50 transition-colors duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 bg-[#0F2645]/50 border border-[#0ea4e9]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0ea4e9]/50 transition-colors duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full p-3 bg-[#0F2645]/50 border border-[#0ea4e9]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0ea4e9]/50 transition-colors duration-300 resize-none"
                      placeholder="Tell us what's on your mind..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group relative px-6 py-3 bg-gradient-to-r from-[#0F2645] to-[#0A1525] rounded-lg border border-[#0ea4e9]/20 hover:border-[#0ea4e9]/50 transition-all duration-300"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,164,233,0.2)_0%,transparent_70%)]" />
                    </div>
                    
                    <span className="relative font-semibold text-white group-hover:text-[#0ea4e9] transition-colors duration-300">
                      Send Message
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
