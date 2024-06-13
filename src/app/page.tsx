"use client";

import Card from "@/ui/card";
import Modal from "@/ui/modal";
import AddWebsite from "@/forms/addWebsite";
import DeleteWebsite from "@/forms/deleteWebsite";
import { useState, useEffect } from "react";
import { ModalProvider, useModal } from "@/context/modalcontext";

interface Sites {
  id: number;
  title: string;
  filename: string;
  url: string;
  wordpress: boolean;
}

function HomeContent() {
  const [sitesURL, setSitesURL] = useState<Sites[]>([]);
  const { openModal } = useModal();

  function handleAddWebsite() {
    openModal(<AddWebsite fetchData={fetchSites} />, "Add Website");
  }

  function handleDeleteWebsite(id: number) {
    openModal(<DeleteWebsite id={id} fetchData={fetchSites} />, "Delete Website");
  }

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

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={handleAddWebsite}
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
            fetchData={fetchSites}
            deleteHandler={() => handleDeleteWebsite(site.id)}
          />
        ))}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ModalProvider>
      <HomeContent />
      <Modal />
    </ModalProvider>
  );
}
