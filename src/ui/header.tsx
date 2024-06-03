import Link from "next/link";

export default function Header({ onOpenModal }: any) {
  return (
    <header className="bg-gray-700 p-4 px-5 flex gap-x-5 items-center mb-5">
      <div className="text-xl">
        <Link href="/">NextJS Checker</Link>
      </div>
      <div className="flex gap-x-4 text-sm">
        <Link href="/">Home</Link>
        <div onClick={onOpenModal}>Add Website</div>
        <Link href="report">Reports</Link>
      </div>
    </header>
  );
}
