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
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { showErrorToast } from "@/hooks/toast";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResponsiveNavbar: React.FC<PropsWithChildren> = ({}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

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
        <SheetTrigger className="w-full lg:hidden" asChild>
          <div className="flex items-center justify-between p-3 bg-white shadow-md sticky top-0 z-30">
            <div className="flex items-center ml-[10px]">
              <Menu size={29} className="text-gray-700 mr-3" />
            </div>

            <div className="flex items-center gap-5">
              <Link href="/cart" className="flex items-center text-gray-700">
                <div className="relative">
                  <Link href="/profile" className="block w-full h-full">
                    <div className="relative w-full h-full  ">
                      <Image
                        src={user?.imageUrl || "/user.jpg"}
                        width={64}
                        height={64}
                        alt="Profile picture"
                        className="rounded-2xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        </SheetTrigger>

        {/* Mobile Sheet Content */}
        <SheetContent side="left" className="max-w-xs w-full p-0">
          <SheetTitle asChild>
            <VisuallyHidden>Mobile navigation menu</VisuallyHidden>
          </SheetTitle>
          <div className="h-full flex flex-col bg-white">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setIsSheetOpen(false)}></button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="py-2 px-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-5">
                Interview
              </div>
              <div className="border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Home size={18} className="mr-3 text-red-600" />
                  <span className="font-medium">Models</span>
                </Link>
              </div>

              <div className="border-b border-gray-200">
                <Link
                  href={"/mock-interview"}
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Store size={18} className="mr-3 text-red-600" />
                  <span className="font-medium"> Mock Interview</span>
                </Link>
              </div>

              <div className="border-b border-gray-200">
                <Link
                  href={"/practice-questions"}
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <ShoppingBag size={18} className="mr-3 text-red-600" />
                  <span className="font-medium"> Practice Sessions</span>
                </Link>
              </div>

              <div className="py-2 px-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3">
                Practice Questions
              </div>
              <div className="border-b border-gray-200">
                <Link
                  href={"/general-questions"}
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Home size={18} className="mr-3 text-red-600" />
                  <span className="font-medium"> General Questions</span>
                </Link>
              </div>

              <div className="border-b border-gray-200">
                <Link
                  href={"/behavioural-questions"}
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Store size={18} className="mr-3 text-red-600" />
                  <span className="font-medium"> Behavioural Questions</span>
                </Link>
              </div>

              <div className="border-b border-gray-200">
                <Link
                  href={"/technical-questions"}
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <ShoppingBag size={18} className="mr-3 text-red-600" />
                  <span className="font-medium"> Technical Questions</span>
                </Link>
              </div>

              <div className="py-2 px-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3">
                Results
              </div>

              <div className="border-b border-gray-200">
                <Link
                  href={"/mock-test-results"}
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <ShoppingBag size={18} className="mr-3 text-red-600" />
                  <span className="font-medium"> Mock Interview Results</span>
                </Link>
              </div>
              <div className="border-b border-gray-200">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item`}>
                    <AccordionTrigger className="px-4  font-medium hover:bg-gray-50 hover:no-underline mr-[54px]">
                      <ShoppingBag size={18} className=" text-red-600" />
                      <span className="text-slate-700 text-sm font-semibold tracking-wide">
                        Practice Questions Results
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <div className="">
                        <Link
                          href={`/category/`}
                          className="flex items-center pl-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <span className="mr-2">•</span>
                          General
                        </Link>
                      </div>
                      <div className="space-y-1 py-1">
                        <Link
                          href={`/category/`}
                          className="flex items-center pl-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <span className="mr-2">•</span>
                          General
                        </Link>
                      </div>
                      <div className="space-y-1 py-1">
                        <Link
                          href={`/category/`}
                          className="flex items-center pl-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <span className="mr-2">•</span>
                          General
                        </Link>
                      </div>{" "}
                      <div className="space-y-1 py-1">
                        <Link
                          href={`/category/`}
                          className="flex items-center pl-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <span className="mr-2">•</span>
                          General
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="mt-auto border-t border-gray-200">
              <div className="grid grid-cols-2 divide-x divide-gray-200"></div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ResponsiveNavbar;
