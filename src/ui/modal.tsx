import { motion } from "framer-motion";

export default function Modal({
  setIsModalOpen,
  content,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
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
      <div className="relative bg-white p-6 rounded shadow-lg z-10">{content}</div>
    </motion.div>
  );
}
