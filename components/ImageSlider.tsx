import { cn } from "@/utils/cn";
import Image from "next/image";

interface PhoneCardProps {
  title: string;
  description: string;
  image: string;
  type: "iphone" | "android";
}

export function PhoneCard({ title, description, image, type }: PhoneCardProps) {
  return (
    <div className="relative w-full max-w-[250px] sm:max-w-[300px] group">
      <div
        className={cn(
          "w-full h-[400px] sm:h-[480px] rounded-3xl shadow-lg overflow-hidden",
          type === "iphone" ? "bg-gray-100" : "bg-gray-200"
        )}
      >
        <div
          className={cn(
            "w-full h-4 sm:h-6 flex items-center justify-center",
            type === "iphone" ? "bg-black rounded-t-3xl" : "bg-gray-300"
          )}
        >
          {type === "iphone" && (
            <div className="w-16 sm:w-20 h-3 sm:h-4 bg-black rounded-b-xl"></div>
          )}
        </div>
        <div className="p-1 sm:p-2 h-[calc(100%-16px)] sm:h-[calc(100%-24px)]">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={500}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {type === "iphone" && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full"></div>
        )}
        {type === "android" && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 border-2 border-gray-400 rounded-full"></div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
          <p className="text-xs sm:text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
