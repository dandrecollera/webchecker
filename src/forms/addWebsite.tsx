import { useState } from "react";
import Input from "@/ui/input";
import { useModal } from "@/context/modalcontext";

export default function AddWebsite({ fetchData }: { fetchData: () => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { setLoading, closeModal } = useModal();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (url) {
      setDisabled(true);
      setLoading(true);
      setMessage("Loading...");
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
            setLoading(false);
            fetchData();
            closeModal();
          }, 2000);
        } else {
          setLoading(false);
          setMessage(`Error: ${data.error}`);
        }
      } catch (error) {
        setLoading(false);
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
          readonly={disabled}
        />
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          readonly={disabled}
        />
        <button type="submit" disabled={disabled}>
          Test
        </button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
}
