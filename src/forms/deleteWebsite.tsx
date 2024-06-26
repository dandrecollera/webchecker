import { useState } from "react";
import { useModal } from "@/context/modalcontext";
import Button from "@/ui/button";

export default function DeleteWebsite({ id, fetchData }: { id: number; fetchData: () => void }) {
  const { setLoading, closeModal } = useModal();
  const [disabled, setDisabled] = useState(false);

  const handleDelete = async () => {
    setDisabled(true);
    setLoading(true);
    try {
      const response = await fetch(`/api/sites/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      console.log(data);
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
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this website?</p>
      <div className="mt-6 gap-x-3 flex justify-end">
        <Button
          text="Cancel"
          styles="bg-white border"
          onClickFunction={closeModal}
          disabled={disabled}
        />
        <Button
          text="Delete"
          styles="bg-red-600 p-2 text-white"
          onClickFunction={handleDelete}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
