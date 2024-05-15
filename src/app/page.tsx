import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {images.map((images, index) => (
          <div key={images.id + "-" + index} className="flex w-48 flex-col">
            <img src={images.url} alt="" />
            <div>{images.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
