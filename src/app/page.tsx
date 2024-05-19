import Link from "next/link";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="grid auto-rows-max grid-cols-3 gap-px">
      {images.map((image) => (
        <Link
          key={image.id}
          href={`/img/${image.id}`}
          className="relative aspect-square "
        >
          <Image
            src={image.url}
            alt={image.name}
            fill
            sizes="33vw"
            style={{ objectFit: "cover" }}
          />
        </Link>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
