// import { GeistSans } from "geist/font/sans";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import "./globals.css";
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Chatti",
  description: "The fastest way to build apps with Next.js and Supabase",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={montserrat.className}>
        <body className=" text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>

    /*  <html lang="en" className={montserrat.className}>
       <body className=" text-foreground">
         {children}
       </body>
     </html> */
  );
}
