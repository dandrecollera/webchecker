"use client";

import Card from "@/ui/card";
import Modal from "@/ui/modal";
import AddWebsite from "@/forms/addWebsite";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

interface Sites {
  id: number;
  name: string;
  filename: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sitesURL, setSitesURL] = useState<Sites[]>([]);

  useEffect(() => {
    async function fetchSites() {
      try {
        const response = await fetch("/api/sites");
        const data: Sites[] = await response.json();
        console.log(data);
        setSitesURL(data);
      } catch (error) {
        console.error(`Failed to fetch sites: ${error}`);
      }
    }
    fetchSites();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button type="button" onClick={openModal} className="bg-blue-500 text-white p-2">
        Open Modal
      </button>
      <main className="grid md:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-4 p-4">
        {sitesURL.map((site) => (
          <Card key={site.id} fileName={site.filename} content={site.name} />
        ))}
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} content={<AddWebsite closeModal={closeModal} />} />
        )}
      </AnimatePresence>
    </>
  );
}
