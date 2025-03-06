import { cn } from "@/utils/cn";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Spiner() {
  return (
    <div className={cn(
      "w-full h-full",
      "flex justify-center items-center"
    )}>

      loading...
    </div>
  )
}