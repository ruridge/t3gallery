import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/ced15ba2-db72-407e-b496-1f0f6281f71c-w5jsli.jpg",
  "https://utfs.io/f/d5a40408-8bdf-492e-8d0c-5693ff0a3748-n4mtny.jpg",
  "https://utfs.io/f/f6eeaf65-4163-4b7b-9592-145f114c29a6-30kk9c.jpg",
  "https://utfs.io/f/2d2d8dee-e85f-49d7-bd1c-f6b02be5058b-p6zx8h.jpg",
  "https://utfs.io/f/47f36605-0298-46f6-87f5-194e2f9e580f-36n3ff.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages, ...mockImages].map(
          (images, index) => (
            <div key={images.id + "-" + index} className="w-48">
              <img src={images.url} alt="" />
            </div>
          ),
        )}
      </div>
    </main>
  );
}
