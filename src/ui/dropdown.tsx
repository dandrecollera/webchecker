import { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

export default function DropDown({
  deleteHandler,
  editHandler,
}: {
  deleteHandler: () => void;
  editHandler: () => void;
}) {
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
        className="p-2 border border-gray-200 bg-white shadow rounded-full mb-2 text-xl"
      >
        <BsThreeDots />
      </button>

      <AnimatePresence>
        {dropped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bg-white border rounded-2xl right-2 w-32 text-right"
          >
            <ul className="list-none">
              <motion.li
                initial={{ backgroundColor: "rgb(255 255 255)" }}
                whileHover={{ backgroundColor: "rgb(245 245 245)" }}
                transition={{ ease: "easeIn" }}
                className="py-2 px-3 border-b rounded-t-2xl"
                onClick={editHandler}
              >
                Edit
              </motion.li>
              <motion.li
                initial={{ backgroundColor: "rgb(255 255 255)" }}
                whileHover={{ backgroundColor: "rgb(245 245 245)" }}
                transition={{ ease: "easeIn" }}
                className="py-2 px-3 rounded-b-2xl"
                onClick={deleteHandler}
              >
                Delete
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
