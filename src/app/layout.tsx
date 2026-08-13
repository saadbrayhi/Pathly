import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
export const metadata:Metadata={title:{default:"Pathly — Always know your next step",template:"%s | Pathly"},description:"Explore scholarships, study abroad opportunities, student visas, and your personalized academic path."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>}
