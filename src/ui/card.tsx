import Image from "next/image";
import Link from "next/link";
import { FaWordpress, FaImage, FaEraser, FaCircle } from "react-icons/fa6";
import DropDown from "@/ui/dropdown";
import { motion } from "framer-motion";

export default function Card({
  filename,
  title,
  url,
  wordpress,
  deleteHandler,
  editHandler,
}: {
  filename: string;
  title: string;
  id: number;
  url: string;
  wordpress: boolean;
  fetchData: () => void;
  deleteHandler: () => void;
  editHandler: () => void;
}) {
  return (
    <motion.div
      className="relative bg-white border rounded-md overflow-hidden shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <Image
        src={`/screencaps/${filename}`}
        width={600}
        height={300}
        alt="test image"
        className="w-full"
      />
      <div className="p-3 h-28">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link href={url} className="text-blue-500" target="_empty">
          {url}
        </Link>
      </div>
      <div className="p-3 flex gap-x-2 text-xl">
        <FaCircle className="text-green-600" />
        <FaImage />
        <FaEraser />
        {wordpress == true ? (
          <Link href={`${url}wp-login.php`} target="_empty">
            <FaWordpress className="text-blue-600" />
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="bg-green-600 border border-green-600 z-10 p-2 px-3 text-white">Active</div>
      <div className="absolute z-100 right-0 top-0">
        <button className="p-2">
          <DropDown deleteHandler={deleteHandler} editHandler={editHandler} />
        </button>
      </div>
    </motion.div>
  );
}
