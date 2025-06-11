"use client";
import React, { useState, PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, Home, Store, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

const ResponsiveNavbar: React.FC<PropsWithChildren> = ({}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const handleStartInterview = (data: string) => {
    // practice-question-results?result=general
    router.push(`/practice-question-results?result=${data}`);
  };

  return (
    <>
      {/* Mobile Top Offer Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white lg:hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center py-2 px-4 text-center">
          <div className="font-medium mb-1 sm:mb-0 sm:mr-3 text-sm">
            AI Interview Copilot
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild className="w-full lg:hidden">
          <header className="flex items-center justify-between px-3 bg-white shadow-md sticky top-0 z-30">
            <div className="flex items-center ml-[10px]">
              <Menu size={29} className="text-gray-700 mr-3" />
            </div>

            {/* logo */}
            <div className="logo">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="w-25 h-25 object-cover"
                />
              </Link>
            </div>

            <nav className="flex items-center">
              <Link
                href="/profile"
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-colors duration-200"
                aria-label="View profile"
              >
                <Image
                  src={user?.imageUrl || "/user.jpg"}
                  width={40}
                  height={40}
                  alt="Profile picture"
                  className="w-full h-full object-cover"
                  priority
                />
              </Link>
            </nav>
          </header>
        </SheetTrigger>

        {/* Mobile Sheet Content */}
        <SheetContent side="left" className="max-w-xs w-full p-0 bg-white">
          <SheetTitle asChild>
            <VisuallyHidden>Mobile navigation menu</VisuallyHidden>
          </SheetTitle>

          <div className="h-full flex flex-col bg-white">
            {/* Beautiful Header */}
            <div className="bg-gradient-to-br from-red-600 via-red-600 to-red-700 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-5"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white opacity-5 rounded-full"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold tracking-wide">Menu</h2>
                <p className="text-red-100 text-sm mt-1 opacity-90">
                  Navigate your interview journey
                </p>
              </div>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50/30 to-white">
              {/* Interview Section */}
              <div className="py-3 px-4 bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-red-600 mt-6 mx-4 rounded-r-lg">
                <div className="text-xs font-bold text-red-700 uppercase tracking-widest flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                  Interview
                </div>
              </div>

              <div className="mx-4 mt-2 space-y-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <Link
                    href="/"
                    className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                      <Home size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                        Models
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        AI Models & Templates
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <Link
                    href="/mock-interview"
                    className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                      <Store size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                        Mock Interview
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Practice with AI
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <Link
                    href="/practice-questions"
                    className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                      <ShoppingBag size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                        Practice Sessions
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Skill Enhancement
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Practice Questions Section */}
              <div className="py-3 px-4 bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-red-600 mt-8 mx-4 rounded-r-lg">
                <div className="text-xs font-bold text-red-700 uppercase tracking-widest flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                  Practice Questions
                </div>
              </div>

              <div className="mx-4 mt-2 space-y-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <Link
                    href="/general-questions"
                    className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                      <Home size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                        General Questions
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Common Inquiries
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <Link
                    href="/behavioural-questions"
                    className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                      <Store size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                        Behavioural Questions
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Soft Skills Assessment
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <Link
                    href="/technical-questions"
                    className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                      <ShoppingBag size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                        Technical Questions
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Technical Expertise
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Results Section */}
              <div className="py-3 px-4 bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-red-600 mt-8 mx-4 rounded-r-lg">
                <div className="text-xs font-bold text-red-700 uppercase tracking-widest flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                  Results
                </div>
              </div>

              <div className="mx-4 mt-2 space-y-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <Link
                    href="/mock-test-results"
                    className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                      <ShoppingBag size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                        Mock Interview Results
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Performance Analytics
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {user ? (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value="practice-results"
                        className="border-0"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent hover:no-underline group transition-all duration-300 [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-red-50 [&[data-state=open]]:to-transparent">
                          <div className="flex items-center w-full">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                              <ShoppingBag size={18} className="text-red-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                                Practice Questions Results
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Detailed Progress Reports
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-5 pb-4">
                          <div className="space-y-2 pl-6">
                            <button
                              onClick={() => handleStartInterview("general")}
                              className="flex items-center py-3 px-4 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                            >
                              <div className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                              <div>
                                <span className="font-medium">General</span>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  Basic assessments
                                </p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleStartInterview("general")}
                              className="flex items-center py-3 px-4 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                            >
                              <div className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                              <div>
                                <span className="font-medium">Behavioural</span>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  Personality tests
                                </p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleStartInterview("general")}
                              className="flex items-center py-3 px-4 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                            >
                              <div className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                              <div>
                                <span className="font-medium">Technical</span>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  Skill evaluations
                                </p>
                              </div>
                            </button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href="/sign-in"
                      className="flex items-center px-5 py-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent group transition-all duration-300"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                        <ShoppingBag size={18} className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                          Practice Questions Results
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Detailed Progress Reports
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Beautiful Sign Out Footer */}
            <div className="mt-auto border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="p-6">
                {user ? (
                  <button
                    onClick={() => signOut()}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center group"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center group"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ResponsiveNavbar;
