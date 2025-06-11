"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/website/footer";
import ResponsiveNavBar from "@/components/website/responsiveNavBar";
import { AppSidebar } from "@/components/website/sideBar";
import { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Show ResponsiveNavBar only on small screens */}
      <div className="lg:hidden">
        <ResponsiveNavBar />
      </div>

      <SidebarProvider>
        <div className="flex w-full h-screen overflow-hidden">
          {/* Show Sidebar only on large screens */}
          <div
            className="hidden lg:block transition-width duration-300"
            style={{ width: isCollapsed ? 80 : 260 }}
          >
            <AppSidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>

          {/* Shared Main Content (always shown) */}
          <div className="flex flex-col z-50 w-full">
            <main className="w-full flex-1 overflow-auto lg:px-20 bg-gray-50">
              {children}
              <ToastContainer limit={1} transition={Slide} />
              <footer>
                <Footer />
              </footer>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
