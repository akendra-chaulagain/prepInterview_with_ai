import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

// import "@clerk/themes/tailwind.css"; // optional but helpful
export const metadata: Metadata = {
  title: "Interview Copilot",
  description: "Your AI-powered interview preparation assistant.",
  openGraph: {
    title: "Interview Copilot",
    description: "Your AI-powered interview preparation assistant.",
    url: "https://yourdomain.com", 
    siteName: "Interview Copilot",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Interview Copilot Logo",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/logo.png", 
  },
};


const appearance = {
  variables: {
    colorPrimary: "#E90012",
    fontSize: "16px",
    borderRadius: "1px",
    spacingUnit: "19px",
    fontFamily: "Inter, sans-serif",
  },
};

const localization = {
  signIn: {
    start: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
    },
  },
  signUp: {
    start: {
      title: "Create Your Account",
      subtitle: "Sign up to get started",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={appearance} localization={localization}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
