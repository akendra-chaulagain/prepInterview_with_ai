import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata = {
  title: "Interview Copilot",
  description: "Your AI-powered interview preparation assistant.",
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en">
      
      <body>
        <ClerkProvider appearance={appearance} localization={localization}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
