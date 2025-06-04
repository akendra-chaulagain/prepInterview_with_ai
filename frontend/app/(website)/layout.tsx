"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/website/footer";
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
    <SidebarProvider>
      <div className="flex  overflow-hidden  w-full h-screen">
        {/* Sidebar */}
        <div
          className="transition-width duration-300"
          style={{ width: isCollapsed ? 80 : 260 }}
        >
          <AppSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col  z-50 w-full">
          <main className="w-full flex-1 overflow-auto px-20 py-10 bg-gray-50">
            {children}
            <ToastContainer 
            limit={1}
            transition={Slide}
            
            />
            <footer>
              <Footer />
            </footer>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
