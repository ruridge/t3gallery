import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  // getting image data from our db
  const image = await getImage(idAsNumber);

  // use the user ID of the user who uploaded the image to get user info from clerk
  const uploaderInfo = await clerkClient.users.getUser(image.userID);

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <div className="relative flex-1 items-center justify-center">
        <Image
          src={image.url}
          alt={image.name}
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-none gap-2 max-md:items-center max-md:justify-center max-md:border-t md:w-48 md:flex-col md:border-l">
        <div className="p-2 text-lg font-bold md:border-b md:text-center">
          {image.name}
        </div>

        <div className="flex flex-col px-2 max-md:py-2">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col px-2 max-md:py-2">
          <span>Created on:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
