import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/modalcontext";

export default function Modal() {
  const { isOpen, isLoading, modalTitle, modalContent, closeModal } = useModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div
            className="fixed inset-0 bg-slate-600 opacity-30"
            onClick={!isLoading ? closeModal : undefined}
          ></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-lg z-10 w-4/12"
          >
            <h1 className="p-4 text-2xl">{modalTitle}</h1>
            <hr className="border-t-2" />
            <div className="p-8">{modalContent}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
