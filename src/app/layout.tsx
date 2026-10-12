import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "🐈 Welcome to my birthday 🐈",
  description: "Confirmación de asistencia al cumpleaños con diseño en blanco, negro y gris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} font-sans h-full`}>
      <body className="min-h-screen w-full bg-[#161616] text-white selection:bg-white selection:text-black flex flex-col items-center justify-center p-0 m-0 font-sans">
        {children}
      </body>
    </html>
  );
}
