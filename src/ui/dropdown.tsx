import { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function DropDown() {
  const [dropped, setDropped] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropped(false);
    }
  };

  useEffect(() => {
    if (dropped) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropped]);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setDropped(!dropped)}
        className="p-2 border border-gray-200 shadow rounded-full mb-2 text-xl"
      >
        <BsThreeDots />
      </button>

      {dropped && (
        <div className="absolute bg-white border rounded-2xl right-2 w-32 text-right">
          <ul className="list-none">
            <li className="py-2 px-3 border-b rounded-t-2xl">Edit</li>
            <li className="py-2 px-3 rounded-b-2xl">Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
}
