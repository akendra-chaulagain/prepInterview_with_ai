import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
// import "@clerk/themes/tailwind.css"; // optional but helpful

const appearance = {
  variables: {
    colorPrimary: "#E90012",
    fontSize: "16px",
    borderRadius: "1px",
    spacingUnit: "19px",
    fontFamily: "Inter, sans-serif",
    inputHeight: "490px",
    
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
      title: "Create Your AK Store Account",
      subtitle: "Sign up to start shopping with us!",
    },
  },
};



export const metadata = {
  title: "AK Store",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={appearance} localization={localization} >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
