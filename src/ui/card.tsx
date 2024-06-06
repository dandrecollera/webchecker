import Image from "next/image";

export default function Card({ fileName, content }: { fileName: string; content: string }) {
  return (
    <div className=" bg-white border-2 rounded-md overflow-hidden shadow-sm ">
      <Image src={`/screencaps/${fileName}`} width={600} height={300} alt="test image" />
      <div className="p-3">
        <h1>{content}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat pariatur nulla ad earum
          saepe quia iste ipsa magnam fugit aspernatur, repellat iusto sed minus, magni aliquid,
          nihil quam in! Deserunt.
        </p>
      </div>
    </div>
  );
}
