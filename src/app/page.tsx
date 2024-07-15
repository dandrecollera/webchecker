"use client";

import Card from "@/ui/card";
import Modal from "@/ui/modal";
import AddWebsite from "@/forms/addWebsite";
import DeleteWebsite from "@/forms/deleteWebsite";
import EditWebsite from "@/forms/editWebsite";
import { useState, useEffect } from "react";
import { ModalProvider, useModal } from "@/context/modalcontext";
import { AnimatePresence } from "framer-motion";
import Header from "@/ui/header";
import SearchInput from "@/ui/searchinput";

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
  const [search, setSearch] = useState("");

  function handleAddWebsite() {
    openModal(<AddWebsite fetchData={fetchSites} />, "Add Website");
  }

  function handleDeleteWebsite(id: number) {
    openModal(<DeleteWebsite id={id} fetchData={fetchSites} />, "Delete Website");
  }

  function handleEditWebsite(id: number, url: string, title: string) {
    openModal(
      <EditWebsite fetchData={fetchSites} id={id} pUrl={url} pTitle={title} />,
      "Edit Website"
    );
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

  const filteredSites = sitesURL.filter((site) =>
    site.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="p-4">
        <div className="flex gap-x-3 w-full mb-6">
          <button
            type="button"
            onClick={handleAddWebsite}
            className="bg-blue-500 rounded-lg text-white p-2 px-4"
          >
            Add Website
          </button>
          <SearchInput
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
        <main className="grid md:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-4">
          <AnimatePresence mode="sync">
            {filteredSites.map((site) => (
              <Card
                key={site.id}
                id={site.id}
                filename={site.filename}
                title={site.title}
                url={site.url}
                wordpress={site.wordpress}
                fetchData={fetchSites}
                deleteHandler={() => handleDeleteWebsite(site.id)}
                editHandler={() => handleEditWebsite(site.id, site.url, site.title)}
              />
            ))}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <ModalProvider>
        <HomeContent />
        <Modal />
      </ModalProvider>
    </>
  );
}
