import Link from "next/link";

export default function Header({ onOpenModal }: any) {
  return (
    <header className="bg-white shadow p-4 px-5 flex gap-x-5 items-center mb-3 text-black">
      <div className="text-xl">
        <Link href="/">NextJS Checker</Link>
      </div>
      <div className="flex gap-x-4 text-sm">
        <Link href="/">Home</Link>
        <div onClick={onOpenModal} style={{ cursor: "pointer" }}>
          Add Website
        </div>
        <Link href="report">Reports</Link>
      </div>
    </header>
  );
}
