import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  // getting image data from our db
  const image = await getImage(idAsNumber);

  // use the user ID of the user who uploaded the image to get user info from clerk
  const uploaderInfo = await clerkClient.users.getUser(image.userID);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="object-contain" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col gap-2 border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>

        <div className="flex flex-col px-2">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col px-2">
          <span>Created on:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
