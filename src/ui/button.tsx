interface ButtonType {
  onClickFunction?: () => void;
  disabled?: boolean;
  styles?: string;
  text: string;
  type?: "submit" | "reset" | "button";
}

export default function Button({ onClickFunction, disabled, styles, text, type }: ButtonType) {
  return (
    <button
      // className="bg-red-600 p-2 rounded-md px-3 w-28 text-sm text-white"
      className={`${styles} p-2 rounded-md px-3 w-28 text-sm`}
      onClick={onClickFunction}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
