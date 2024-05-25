import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ setIsModalOpen }: any) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute top-0">
          <div className="absolute w-screen h-screen flex items-center justify-center align-middle z-50">
            <div className="bg-yellow-300">
              <h2>Modal Title</h2>
              <p>Modal Content</p>
              <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
            </div>
          </div>
          <div className="absolute bg-blue-300 w-screen h-screen opacity-35"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
