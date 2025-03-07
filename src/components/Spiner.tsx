import { cn } from "@/utils/cn";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Spiner() {
  return (
    <div className={cn(
      "w-full h-full",
      "flex justify-center items-center",
      "absolute left-0 top-0"
    )}>
      <AiOutlineLoading3Quarters className='mr-[8px] animate-spin w-[24px]' />loading...
    </div>
  )
}