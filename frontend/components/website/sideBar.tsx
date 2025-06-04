"use client";

import {
  ChevronsLeft,
  ChevronsRight,
  Laptop,
  LaptopMinimalCheckIcon,
  ShieldQuestionIcon,
  NotepadTextIcon,
  Bot,
  BookCheckIcon,
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
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export function AppSidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  console.log(user?.imageUrl);

  return (
    <Sidebar>
      <SidebarContent
        className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 h-full shadow-xl transition-all duration-300 border-r border-slate-200/60"
        style={{ width: isCollapsed ? 80 : 280 }}
      >
        <div className="flex flex-col justify-between h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="px-6 pt-8 pb-6 flex items-center justify-between border-b border-slate-100">
              {!isCollapsed && (
                <Link href="/">
                  <div className="flex items-center">
                    <Image
                      src="/logo.webp"
                      alt="logo"
                      width={75}
                      height={75}
                      className="cursor-pointer drop-shadow-md rounded-xl hover:drop-shadow-lg transition-all duration-300"
                    />
                  </div>
                </Link>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-slate-500 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-transparent hover:border-red-100"
              >
                {isCollapsed ? (
                  <ChevronsRight className="w-5 h-5" />
                ) : (
                  <ChevronsLeft className="w-5 h-5" />
                )}
              </button>
            </SidebarGroupLabel>

            <SidebarGroupContent className="pt-6 px-2">
              <SidebarMenu className="space-y-1">
                {!isCollapsed && (
                  <div className="px-4 mb-4">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-wider">
                      Interview
                    </span>
                  </div>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/"}
                      className={`flex items-center gap-4 font-medium px-4 py-3.5 mx-2 rounded-xl transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:shadow-sm group ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <Laptop
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-slate-600 group-hover:text-red-600 transition-colors`}
                      />
                      {!isCollapsed && (
                        <span className="text-slate-700 text-sm font-medium">
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
                      className={`flex items-center gap-4 font-medium px-4 py-3.5 mx-2 rounded-xl transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:shadow-sm group ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <LaptopMinimalCheckIcon
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-slate-600 group-hover:text-red-600 transition-colors`}
                      />
                      {!isCollapsed && (
                        <span className="text-slate-700 text-sm font-medium">
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
                      className={`flex items-center gap-4 font-medium px-4 py-3.5 mx-2 rounded-xl transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:shadow-sm group ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <ShieldQuestionIcon
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-slate-600 group-hover:text-red-600 transition-colors`}
                      />
                      {!isCollapsed && (
                        <span className="text-slate-700 text-sm font-medium">
                          Practice Questions
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Divider */}
                <div className="px-4 my-6">
                  <hr className="border-slate-200" />
                </div>

                {!isCollapsed && (
                  <div className="px-4 mb-4">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-wider">
                      Results
                    </span>
                  </div>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href={"/mock-test-results"}
                      className={`flex items-center gap-4 font-medium px-4 py-3.5 mx-2 rounded-xl transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:shadow-sm group ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <NotepadTextIcon
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-slate-600 group-hover:text-red-600 transition-colors`}
                      />
                      {!isCollapsed && (
                        <span className="text-slate-700 text-sm font-medium">
                          Mock Interview Results
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href={"/practice-question-results"}
                      className={`flex items-center gap-4 font-medium px-4 py-3.5 mx-2 rounded-xl transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:shadow-sm group ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <BookCheckIcon
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-slate-600 group-hover:text-red-600 transition-colors`}
                      />
                      {!isCollapsed && (
                        <span className="text-slate-700 text-sm font-medium">
                          Practice Question Results
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* preparation hub */}
                <div className="px-4 my-6">
                  <hr className="border-slate-200" />
                </div>

                {!isCollapsed && (
                  <div className="px-4 mb-4">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-wider">
                      ASSISTENCE
                    </span>
                  </div>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/career-coach"}
                      className={`flex items-center gap-4 font-medium px-4 py-3.5 mx-2 rounded-xl transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:shadow-sm group ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <Bot
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-slate-600 group-hover:text-red-600 transition-colors`}
                      />
                      {!isCollapsed && (
                        <span className="text-slate-700 text-sm font-medium">
                          Career Coach
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Profile Section */}
          <div className="p-6 bg-white mx-4 mb-4 rounded-2xl shadow-sm border border-slate-100 backdrop-blur-sm">
            {!isCollapsed && (
              <div className="mb-4 text-center">
                <div className="w-12 h-12  rounded-full mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Link
                    href={"/profile"}
                    className="text-white font-semibold text-lg cursor-pointer"
                  >
                    <Image
                      src={user?.imageUrl || "/user.jpg"}
                      width={100}
                      height={100}
                      alt="Picture of the author"
                    />
                  </Link>
                </div>
                <span className="block text-sm font-medium text-slate-700 mb-1">
                  Akendra
                </span>
                <span className="block text-xs text-slate-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            )}
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm active:scale-95">
              {isCollapsed ? <span className="text-lg">⎋</span> : "Sign Out"}
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
