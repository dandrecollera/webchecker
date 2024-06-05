"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/ui/header";
import Modal from "@/ui/modal";
import AddWebsite from "@/forms/addWebsite";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatePresence>
          {isModalOpen && (
            <Modal
              setIsModalOpen={setIsModalOpen}
              content={<AddWebsite closeModal={closeModal} />}
            />
          )}
        </AnimatePresence>
        <Header onOpenModal={() => setIsModalOpen(true)} />
        {children}
      </body>
    </html>
  );
}
