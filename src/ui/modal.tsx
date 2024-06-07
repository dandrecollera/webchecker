import { motion } from "framer-motion";

export default function Modal({
  setIsModalOpen,
  content,
  title,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="fixed inset-0 bg-slate-600 opacity-30"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="relative bg-white rounded-2xl shadow-lg z-10 w-4/12">
        <h1 className="p-4 text-2xl">{title}</h1>
        <hr className=" border-t-2" />
        <div className="p-8">{content}</div>
      </div>
    </motion.div>
  );
}
