import Modal from "@/components/Modal/Modal";
import cn from "classnames";
import { MockPicData, MockCategories, MockBaseParams } from '@/mock/label'
import { useState } from "react";
import Spiner from '@/components/Spiner'


interface IProps {
  isOpen: boolean;
  setisOpen: (data) => void

}
export default function LabelTargetModal(props: IProps) {
  const { isOpen, setisOpen } = props
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500)
  }
  return (
    <Modal isOpen={isOpen} onClose={() => { setisOpen(false) }} title={'目标区域'}>
      <div className={cn(
        "w-full h-[400px] relative",
        "flex justify-center items-center overflow-hidden",
      )}>
        {!isLoaded && <Spiner />}
        <img
          onLoad={handleImageLoad}
          style={{ display: isLoaded ? 'block' : 'none' }} // 控制图片显示
          src={MockPicData[0].src} alt="" className={cn(
            "object-contain max-w-full max-h-full",
            "select-none",
            "border-[2px] border-dashed border-[red]",
          )} />
      </div>
    </Modal>
  )
}
