"use client";

import Card from "@/ui/card";
import Modal from "@/ui/modal";
import AddWebsite from "@/forms/addWebsite";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

interface Sites {
  id: number;
  title: string;
  filename: string;
  url: string;
  wordpress: boolean;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sitesURL, setSitesURL] = useState<Sites[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchSites() {
    try {
      const response = await fetch("/api/sites");
      const data: Sites[] = await response.json();
      setSitesURL(data);
    } catch (error) {
      console.error(`Failed to fetch sites: ${error}`);
    }
  }

  useEffect(() => {
    fetchSites();
  }, []);

  const closeModal = () => {
    fetchSites();
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const startLoading = () => {
    setLoading(true);
  };

  const endLoading = () => {
    setLoading(false);
  };

  return (
    <>
      <div className="p-4">
        <button
          type="button"
          onClick={openModal}
          className="bg-blue-500 rounded-lg text-white p-2 px-4 mb-2"
        >
          Add Website
        </button>
        <main className="grid md:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-4">
          {sitesURL.map((site) => (
            <Card
              key={site.id}
              id={site.id}
              filename={site.filename}
              title={site.title}
              url={site.url}
              wordpress={site.wordpress}
            />
          ))}
        </main>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            setIsModalOpen={setIsModalOpen}
            content={
              <AddWebsite closeModal={closeModal} loading={startLoading} endLoading={endLoading} />
            }
            title="Add Website"
            loading={loading}
          />
        )}
      </AnimatePresence>
    </>
  );
}
