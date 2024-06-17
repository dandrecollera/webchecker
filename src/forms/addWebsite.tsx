import { useState } from "react";
import Input from "@/ui/input";
import { useModal } from "@/context/modalcontext";
import Button from "@/ui/button";
export default function AddWebsite({ fetchData }: { fetchData: () => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { setLoading, closeModal } = useModal();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (url) {
      setDisabled(true);
      setLoading(true);
      try {
        const response = await fetch(`/api/screencap`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, title }),
        });

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
        <center>
          <Button
            text="Add Website"
            styles="bg-blue-600 p-2 text-white"
            disabled={disabled}
            type="submit"
          />
        </center>
      </form>
    </div>
  );
}
