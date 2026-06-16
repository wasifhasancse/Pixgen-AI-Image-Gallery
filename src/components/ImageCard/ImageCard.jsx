import { Button, Card, Chip, Separator } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import BuyButton from "./BuyButton";

const ImageCard = ({ photoInfo }) => {
  return (
    <Card className="border rounded-xl">
      <div className="relative w-full aspect-square">
        <Image
          src={photoInfo?.imageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={photoInfo?.title}
          className="object-cover rounded-xl"
        />

        <Chip size="sm" className="absolute right-2 top-2">
          {photoInfo?.category}
        </Chip>
      </div>

      <div>
        <h2 className="font-medium">{photoInfo?.title}</h2>
      </div>

      <div className="flex gap-5">
        <div className="flex items-center gap-2">
          <p>
            <FaHeart />
          </p>
          <p>{photoInfo?.likes}</p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex items-center gap-2">
          <p>
            <BiDownload />
          </p>
          <p>{photoInfo?.downloads}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2.5">
        <Link href={`/all-photos/${photoInfo?._id}`} className="w-full">
          <Button variant="outline" className={'w-full px-5 py-2 border-2 border-purple-300 hover:bg-purple-200 cursor-pointer bg-purple-100 text-purple-700 rounded-full text-sm font-medium'}>
            View
          </Button>
        </Link>

        <BuyButton photoInfo={photoInfo} />
      </div>
    </Card>
  );
};

export default ImageCard;
