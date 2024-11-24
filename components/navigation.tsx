"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";

const solutions = [
  {
    title: "Trading Systems",
    href: "/solutions/trading-systems",
    description: "High-frequency and algorithmic trading solutions",
  },
  {
    title: "Alpha Generation",
    href: "/solutions/alpha-generation",
    description: "Systematic strategies for market alpha",
  },
  {
    title: "Backtesting",
    href: "/solutions/backtesting",
    description: "Comprehensive backtesting and strategy validation",
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = React.useState(false);
  const [showSlogan, setShowSlogan] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const sloganDesktop = "Human Insight, Computational Might";
  const sloganMobile = "Human Insight,\nComputational Might";
  
  // Character animation for Thanos effect
  const characterVariants = {
    exit: {
      opacity: 0,
      y: 20,
      rotate: Math.random() * 30 - 15,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // Desktop typewriter animation
  const typewriterVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        width: { duration: 2, ease: "easeOut" },
        opacity: { duration: 0.5, ease: "easeIn" }
      }
    },
    exit: {
      opacity: 0,
      scale: [1, 0.9],
      filter: "blur(10px)",
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  // Mobile fade animation
  const mobileVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  React.useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const sloganTimer = setTimeout(() => {
      setShowSlogan(true);
    }, 3000);

    const returnTimer = setTimeout(() => {
      setShowSlogan(false);
    }, 8000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(sloganTimer);
      clearTimeout(returnTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0ea4e9]/10 bg-[#0F2645]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0F2645]/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo.png"
              alt="BlueBuck Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="relative h-8 w-64">
            <AnimatePresence mode="wait">
              {mounted && (
                <>
                  {!showSlogan ? (
                    <motion.span
                      key="firmName"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 1.2,
                        ease: "easeInOut"
                      }}
                      className="absolute left-0 text-2xl text-white font-['Cormorant_Garamond'] font-medium"
                    >
                      BlueBuck
                    </motion.span>
                  ) : (
                    isMobile ? (
                      <motion.div
                        key="slogan-mobile"
                        variants={mobileVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 text-base text-white/80 font-['Inter'] font-light tracking-wide whitespace-pre-wrap"
                      >
                        {sloganMobile}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="slogan-desktop"
                        variants={typewriterVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 overflow-hidden whitespace-nowrap"
                      >
                        <motion.span
                          className="text-base text-white/80 font-['Inter'] font-light tracking-wide"
                        >
                          {sloganDesktop.split("").map((char, index) => (
                            <motion.span
                              key={index}
                              variants={characterVariants}
                              style={{ 
                                display: "inline-block",
                                marginLeft: char === " " ? "0.25em" : "0"
                              }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </motion.span>
                      </motion.div>
                    )
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu className="mx-6">
            <NavigationMenuList className="!gap-1">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:text-[#0ea4e9] focus:text-[#0ea4e9] focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname === "/" && "text-[#0ea4e9]"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {solutions.map((solution) => (
                      <ListItem
                        key={solution.title}
                        title={solution.title}
                        href={solution.href}
                      >
                        {solution.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:text-[#0ea4e9] focus:text-[#0ea4e9] focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname === "/about" && "text-[#0ea4e9]"
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/careers" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:text-[#0ea4e9] focus:text-[#0ea4e9] focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname === "/careers" && "text-[#0ea4e9]"
                    )}
                  >
                    Careers
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:text-[#0ea4e9] focus:text-[#0ea4e9] focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname === "/contact" && "text-[#0ea4e9]"
                    )}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Investor Login Button - Desktop */}
          <Button 
            asChild
            className="bg-[#0ea4e9] hover:bg-[#0284c7] text-white font-semibold"
          >
            <Link href="/investor-login">Investor Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-[#0ea4e9]/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-0 right-0 bg-[#0F2645]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0F2645]/60 border-b border-[#0ea4e9]/10 z-50"
        >
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/"
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white hover:text-[#0ea4e9]",
                  pathname === "/" && "text-[#0ea4e9]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full px-4 py-2 text-sm font-medium text-white hover:text-[#0ea4e9] flex items-center justify-between"
                >
                  Solutions
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileSolutionsOpen && "rotate-180")} />
                </button>
                {mobileSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pl-8 py-2 space-y-2"
                  >
                    {solutions.map((solution) => (
                      <Link
                        key={solution.title}
                        href={solution.href}
                        className="block px-4 py-2 text-sm text-white hover:text-[#0ea4e9]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {solution.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
              <Link 
                href="/about"
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white hover:text-[#0ea4e9]",
                  pathname === "/about" && "text-[#0ea4e9]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/careers"
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white hover:text-[#0ea4e9]",
                  pathname === "/careers" && "text-[#0ea4e9]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                href="/contact"
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white hover:text-[#0ea4e9]",
                  pathname === "/contact" && "text-[#0ea4e9]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Login Button */}
              <div className="px-4 pt-4 border-t border-[#0ea4e9]/10">
                <Button 
                  asChild
                  className="w-full bg-[#0ea4e9] hover:bg-[#0284c7] text-white font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/investor-login">Investor Login</Link>
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";