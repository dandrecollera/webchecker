import Image from "next/image";
import Link from "next/link";

export default function Card({
  filename,
  title,
  id,
  url,
}: {
  filename: string;
  title: string;
  id: number;
  url: string;
}) {
  return (
    <div className=" bg-white border rounded-md overflow-hidden shadow-sm">
      <Image src={`/screencaps/${filename}`} width={600} height={300} alt="test image" />
      <div className="p-3">
        <h1 className="text-xl font-bold">
          {id}. {title}
        </h1>
        <p>
          <Link href={url} className="text-blue-500" target="_empty">
            {url}
          </Link>
        </p>
      </div>
    </div>
  );
}
