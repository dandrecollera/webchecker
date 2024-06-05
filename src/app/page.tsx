"use client";

import { useEffect, useState } from "react";
import Card from "@/ui/card";
import Sites from "@/data/sites";
import { metadata } from "@/data/metadata";

export default function Home() {
  const [sites, setSites] = useState<{ id: number; fileName: string }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSites() {
      try {
        const rows = await Sites();
        console.log("Sites data:", rows);
        setSites(rows);
      } catch (error) {
        setError("Error fetching data"); // Handle error explicitly
      }
    }

    fetchSites();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  return (
    <main className="grid md:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-4 p-4">
      {sites.map((site) => (
        <Card key={site.id} fileName={site.fileName} />
      ))}
    </main>
  );
}
