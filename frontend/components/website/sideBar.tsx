"use client";

import {
  ChevronsLeft,
  ChevronsRight,
  Laptop,
  LaptopMinimalCheckIcon,
  Brain,
  ShieldQuestionIcon,
  NotepadTextIcon,
  Bot,
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

export function AppSidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Sidebar>
      <SidebarContent
        className="bg-gradient-to-b from-gray-50 to-gray-100 h-full shadow-lg transition-all duration-300 border-r border-gray-200"
        style={{ width: isCollapsed ? 80 : 260 }}
      >
        <div className="flex flex-col justify-between h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 pt-6 pb-4 flex items-center justify-between">
              {!isCollapsed && (
                <Link href="/dashboard">
                  <div className="flex items-center">
                    <Image
                      src="/logo.webp"
                      alt="logo"
                      width={70}
                      height={70}
                      className="cursor-pointer drop-shadow-lg rounded-lg"
                    />
                  </div>
                </Link>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-600 p-2 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-colors"
              >
                {isCollapsed ? (
                  <ChevronsRight className="w-5 h-5" />
                ) : (
                  <ChevronsLeft className="w-5 h-5" />
                )}
              </button>
            </SidebarGroupLabel>

            <SidebarGroupContent className="pt-4">
              <hr className="border-gray-200 opacity-60 mx-4 mt-[10px]" />

              <SidebarMenu>
                {!isCollapsed && (
                  <span className="text-gray-500 text-sm font-semibold mt-[15px] ml-[10px]">
                    Interview
                  </span>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/"}
                      className={`flex items-center gap-3 font-medium px-4 py-3 mx-2 my-1 rounded-xl transition-all  ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <Laptop
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-gray-700`}
                      />
                      {!isCollapsed && (
                        <span className="text-gray-700 text-[15px]">
                          Interview Models
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/"}
                      className={`flex items-center gap-3 font-medium px-4 py-3 mx-2 my-1 rounded-xl transition-all  ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <LaptopMinimalCheckIcon
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-gray-700`}
                      />
                      {!isCollapsed && (
                        <span className="text-gray-700 text-[15px]">
                          Mock Interview
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/"}
                      className={`flex items-center gap-3 font-medium px-4 py-3 mx-2 my-1 rounded-xl transition-all  ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <Brain
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-gray-700`}
                      />
                      {!isCollapsed && (
                        <span className="text-gray-700 text-[15px]">
                          Prepration Hub
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/"}
                      className={`flex items-center gap-3 font-medium px-4 py-3 mx-2 my-1 rounded-xl transition-all  ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <ShieldQuestionIcon
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-gray-700`}
                      />
                      {!isCollapsed && (
                        <span className="text-gray-700 text-[15px]">
                          Practice Questions
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {/* second part */}
                <hr className="border-gray-200 opacity-60 mx-4 " />
                {!isCollapsed && (
                  <span className="text-gray-500 text-sm font-semibold mt-[15px] ml-[10px]">
                    Mock Results
                  </span>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/"}
                      className={`flex items-center gap-3 font-medium px-4 py-3 mx-2 my-1 rounded-xl transition-all  ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <NotepadTextIcon
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-gray-700`}
                      />
                      {!isCollapsed && (
                        <span className="text-gray-700 text-[15px]">
                          Mock Interview&apos;s Results
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={"/"}
                      className={`flex items-center gap-3 font-medium px-4 py-3 mx-2 my-1 rounded-xl transition-all  ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <Bot
                        className={`${
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        } text-gray-700`}
                      />
                      {!isCollapsed && (
                        <span className="text-gray-700 text-[15px]">
                          Career Coach
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="p-5 bg-white mx-3 mb-3 rounded-xl shadow-sm border border-gray-100">
            {!isCollapsed && (
              <div className="mb-2">
                <span className="block text-center font-medium text-[13px] text-gray-500">
                  akendra@gmail.com
                </span>
              </div>
            )}
            <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-4 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition mt-1 shadow-sm text-sm">
              {isCollapsed ? "⎋" : "Logout"}
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
