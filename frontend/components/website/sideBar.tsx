"use client";

import {
  ChevronsLeft,
  ChevronsRight,
  Laptop,
  LaptopMinimalCheckIcon,
  ShieldQuestionIcon,
  NotepadTextIcon,
  BookCheckIcon,
  GpuIcon,
  Brain,
  BookCopyIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/hooks/toast";
import { capitalizeFirstLetter } from "@/hooks/capitalizeFirstLetter";

export function AppSidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const handleStartInterview = (data: string) => {
    // practice-question-results?result=general
    router.push(`/practice-question-results?result=${data}`);
  };

  return (
    <>
      <Sidebar className="hidden lg:block">
        <SidebarContent
          className="w-full bg-gradient-to-br from-white via-slate-50/50 to-white h-full shadow-2xl transition-all duration-500 ease-in-out border-r border-slate-200/40 backdrop-blur-sm hidden lg:block"
          style={{ width: isCollapsed ? 80 : 280 }}
        >
          <div className="flex flex-col justify-between h-full relative">
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-600/[0.02] via-transparent to-red-600/[0.02] pointer-events-none" />

            <SidebarGroup className="relative z-10">
              <SidebarGroupLabel className="px-6 pt-8 pb-6 flex items-center justify-between border-b border-slate-200/50 bg-white/60 backdrop-blur-sm">
                {!isCollapsed && (
                  <Link href="/" className="group">
                    <div className="flex items-center">
                      <div className="relative">
                        <Image
                          src="/logo.png"
                          alt="logo"
                          width={140}
                          height={100}
                          className="cursor-pointer  rounded-2xl "
                        />
                      </div>
                    </div>
                  </Link>
                )}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-slate-400 p-3 rounded-xl hover:bg-red-50/80 hover:text-red-600 transition-all duration-300 border border-transparent hover:border-red-100/60 hover:shadow-sm backdrop-blur-sm group"
                >
                  {isCollapsed ? (
                    <ChevronsRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <ChevronsLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  )}
                </button>
              </SidebarGroupLabel>

              <SidebarGroupContent className="pt-8 px-3">
                <SidebarMenu className="space-y-2">
                  {!isCollapsed && (
                    <div className="px-4 mb-2">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-600/20 mr-2" />
                        Interview
                      </span>
                    </div>
                  )}

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={"/"}
                        className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group backdrop-blur-sm ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <Laptop
                          className={`${
                            isCollapsed ? "h-6 w-6" : "h-5 w-5"
                          } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                        />
                        {!isCollapsed && (
                          <span className="text-slate-700 text-sm font-semibold tracking-wide">
                            Models
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={"/mock-interview"}
                        className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group backdrop-blur-sm ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <LaptopMinimalCheckIcon
                          className={`${
                            isCollapsed ? "h-6 w-6" : "h-5 w-5"
                          } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                        />
                        {!isCollapsed && (
                          <span className="text-slate-700 text-sm font-semibold tracking-wide">
                            Mock Interview
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={"/practice-questions"}
                        className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group backdrop-blur-sm ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <ShieldQuestionIcon
                          className={`${
                            isCollapsed ? "h-6 w-6" : "h-5 w-5"
                          } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                        />
                        {!isCollapsed && (
                          <span className="text-slate-700 text-sm font-semibold tracking-wide">
                            Practice Sessions
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Enhanced Divider */}
                  <div className="px-4 my-1">
                    <div className="relative">
                      <hr className="border-slate-200/60" />
                      <div className="absolute inset-0 flex justify-center">
                        <div className="w-1 h-1 rounded-full bg-red-600/30 -mt-0.5" />
                      </div>
                    </div>
                  </div>

                  {!isCollapsed && (
                    <div className="px-4 mb-2">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-600/20 mr-2" />
                        Practice Questions
                      </span>
                    </div>
                  )}

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={"/general-questions"}
                        className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group backdrop-blur-sm ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <BookCopyIcon
                          className={`${
                            isCollapsed ? "h-6 w-6" : "h-5 w-5"
                          } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                        />
                        {!isCollapsed && (
                          <span className="text-slate-700 text-sm font-semibold tracking-wide">
                            General Questions
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={"/behavioural-questions"}
                        className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group backdrop-blur-sm ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <Brain
                          className={`${
                            isCollapsed ? "h-6 w-6" : "h-5 w-5"
                          } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                        />
                        {!isCollapsed && (
                          <span className="text-slate-700 text-sm font-semibold tracking-wide">
                            Behavioural Questions
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={"/technical-questions"}
                        className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group backdrop-blur-sm ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <GpuIcon
                          className={`${
                            isCollapsed ? "h-6 w-6" : "h-5 w-5"
                          } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                        />
                        {!isCollapsed && (
                          <span className="text-slate-700 text-sm font-semibold tracking-wide">
                            Technical Questions
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Enhanced Divider */}
                  <div className="px-4 my-1">
                    <div className="relative">
                      <hr className="border-slate-200/60" />
                      <div className="absolute inset-0 flex justify-center">
                        <div className="w-1 h-1 rounded-full bg-red-600/30 -mt-0.5" />
                      </div>
                    </div>
                  </div>

                  {!isCollapsed && (
                    <div className="px-4 mb-2">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-600/20 mr-2" />
                        Results
                      </span>
                    </div>
                  )}

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"/mock-test-results"}
                        className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group backdrop-blur-sm ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <NotepadTextIcon
                          className={`${
                            isCollapsed ? "h-6 w-6" : "h-5 w-5"
                          } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                        />
                        {!isCollapsed && (
                          <span className="text-slate-700 text-sm font-semibold tracking-wide">
                            Mock Interview Results
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div
                            className={`flex items-center gap-4 font-medium px-5 py-4 mx-2 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/80 hover:to-red-50/40 hover:text-red-700 hover:shadow-lg hover:shadow-red-600/10 hover:border-red-100/40 border border-transparent group cursor-pointer backdrop-blur-sm ${
                              isCollapsed ? "justify-center" : ""
                            }`}
                          >
                            <BookCheckIcon
                              className={`${
                                isCollapsed ? "h-6 w-6" : "h-5 w-5"
                              } text-slate-500 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110`}
                            />
                            {!isCollapsed && (
                              <span
                                onClick={() => {
                                  if (!user) {
                                    router.push("/sign-in");
                                    showErrorToast(
                                      "Please sign in to view results."
                                    );
                                  }
                                }}
                                className="text-slate-700 text-sm font-semibold tracking-wide"
                              >
                                Practice Questions Results
                              </span>
                            )}
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {user && !isCollapsed && (
                        <CollapsibleContent className="pl-16 py-2 space-y-2">
                          <button
                            onClick={() => handleStartInterview("general")}
                            className=" block text-sm cursor-pointer font-semibold text-slate-600 hover:text-red-600 transition-all duration-200 py-1.5 px-3 rounded-lg hover:bg-red-50/50 relative group"
                          >
                            <span className="absolute left-0 top-1/2 w-2 h-0.5 bg-red-600/30 -translate-y-1/2 group-hover:bg-red-600 transition-colors duration-200" />
                            General
                          </button>
                          <button
                            onClick={() => handleStartInterview("behavioral")}
                            className="block text-sm cursor-pointer font-semibold text-slate-600 hover:text-red-600 transition-all duration-200 py-1.5 px-3 rounded-lg hover:bg-red-50/50 relative group"
                          >
                            <span className="absolute left-0 top-1/2 w-2 h-0.5 bg-red-600/30 -translate-y-1/2 group-hover:bg-red-600 transition-colors duration-200" />
                            Behavioural
                          </button>
                          <button
                            onClick={() => handleStartInterview("technical")}
                            className="block text-sm cursor-pointer font-semibold text-slate-600 hover:text-red-600 transition-all duration-200 py-1.5 px-3 rounded-lg hover:bg-red-50/50 relative group"
                          >
                            <span className="absolute left-0 top-1/2 w-2 h-0.5 bg-red-600/30 -translate-y-1/2 group-hover:bg-red-600 transition-colors duration-200" />
                            Technical
                          </button>
                          <button
                            onClick={() =>
                              handleStartInterview("all-questions")
                            }
                            className="block text-sm font-semibold cursor-pointer text-slate-600 hover:text-red-600 transition-all duration-200 py-1.5 px-3 rounded-lg hover:bg-red-50/50 relative group"
                          >
                            <span className="absolute left-0 top-1/2 w-2 h-0.5 bg-red-600/30 -translate-y-1/2 group-hover:bg-red-600 transition-colors duration-200" />
                            All Practice Questions
                          </button>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Enhanced User Profile Section */}
            <div className="p-6 bg-gradient-to-br from-white/90 via-white/95 to-slate-50/90 mx-4 mb-6 rounded-3xl shadow-xl border border-slate-200/50 backdrop-blur-lg relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.02] to-transparent" />

              {!isCollapsed &&
                (user ? (
                  <div className="relative z-10">
                    <div className="mb-5 text-center">
                      <div className="relative w-16 h-16 rounded-2xl mx-auto mb-4 group">
                        <Link href="/profile" className="block w-full h-full">
                          <div className="relative w-full h-full rounded-2xl overflow-hidden ring-2 ring-slate-200/50 group-hover:ring-red-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                            <Image
                              src={user?.imageUrl || "/user.jpg"}
                              width={64}
                              height={64}
                              alt="Profile picture"
                              className="rounded-2xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </Link>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-sm font-bold text-slate-800 tracking-wide">
                          {capitalizeFirstLetter(user?.username || "User")}
                        </span>
                        <span className="block text-xs text-slate-500 font-medium">
                          {user?.primaryEmailAddress?.emailAddress}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="w-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white py-3.5 px-5 cursor-pointer rounded-2xl font-bold hover:from-red-700 hover:via-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-600/25 text-sm active:scale-95 transform hover:-translate-y-0.5 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 tracking-wide">
                        {isCollapsed ? (
                          <span className="text-lg">⎋</span>
                        ) : (
                          "Log Out"
                        )}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <Link href={"/sign-in"}>
                      <button className="w-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white py-3.5 px-5 cursor-pointer rounded-2xl font-bold hover:from-red-700 hover:via-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-600/25 text-sm active:scale-95 transform hover:-translate-y-0.5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 tracking-wide">
                          {isCollapsed ? (
                            <span className="text-lg">⎋</span>
                          ) : (
                            "Sign In"
                          )}
                        </span>
                      </button>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
