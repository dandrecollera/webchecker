import { useState } from "react";

export default function AddWebsite({ closeModal }: { closeModal: () => void }) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (url) {
      try {
        const response = await fetch(`/api/screencap?url=${encodeURIComponent(url)}`);
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
      <form onSubmit={handleSubmit}>
        <input
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
