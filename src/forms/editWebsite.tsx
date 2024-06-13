import Input from "@/ui/input";
import { useState } from "react";
import { useModal } from "@/context/modalcontext";

export default function EditWebsite({
  fetchData,
  pTitle,
  pUrl,
  id,
}: {
  fetchData: () => void;
  pTitle: string;
  pUrl: string;
  id: number;
}) {
  const [disabled, setDisabled] = useState(false);
  const [url, setUrl] = useState(pUrl);
  const [title, setTitle] = useState(pTitle);

  const { setLoading, closeModal } = useModal();

  const handleEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (url) {
      setDisabled(true);
      setLoading(true);
      try {
        const response = await fetch("/api/sites/edit", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, url, title }),
        });

        const data = await response.json();
        if (response.ok) {
          setTimeout(() => {
            setLoading(false);
            fetchData();
            closeModal();
          }, 2000);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleEdit} className="flex flex-col gap-y-6">
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
    </div>
  );
}
