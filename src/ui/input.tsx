import { ChangeEventHandler } from "react";
import { easeInOut, motion } from "framer-motion";
interface InputProps {
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder?: string;
}

export default function Input({ type, value, onChange, required, placeholder }: InputProps) {
  return (
    <motion.input
      whileFocus={{ outline: "2px solid rgb(59 130 246)", color: "#000000" }}
      initial={{ outline: "2px solid #E7E7E7", color: "#000000" }}
      transition={{ ease: "easeInOut" }}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="rounded-md p-2"
    ></motion.input>
  );
}
