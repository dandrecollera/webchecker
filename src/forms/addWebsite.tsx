import { useState } from "react";
import Input from "@/ui/input";
export default function AddWebsite({ closeModal }: { closeModal: () => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (url) {
      try {
        const response = await fetch(`/api/screencap`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, title }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(`Screenshot captured! File: ${data.fileName}`);
          setTimeout(() => {
            setMessage("");
            closeModal();
          }, 1000);
        } else {
          setMessage(`Error: ${data.error}`);
        }
      } catch (error) {
        setMessage(`Error: ${(error as Error).message}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          required
        />
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Test</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
