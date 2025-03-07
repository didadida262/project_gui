import Modal from "@/components/Modal/Modal";
import cn from "classnames";
import { MockPicData, MockCategories, MockBaseParams } from '@/mock/label'
import { useState } from "react";
import Spiner from '@/components/Spiner'


interface IProps {
  isOpenbaseparams: boolean;
  setisOpenbaseparams: (data) => void

}
export default function BaseParamsModal(props: IProps) {
  const { isOpenbaseparams, setisOpenbaseparams } = props

  return (
    <Modal isOpen={isOpenbaseparams} onClose={() => { setisOpenbaseparams(false) }} title={'基本参数显示'}>
      <div className={cn(
        "w-full h-auto relative",
        "flex justify-start items-start overflow-hidden flex-col gap-y-4",
        "py-[20px]",

      )}>
        {MockBaseParams.map((item, index) => (
          <div key={index}>{item.name + ': ' + item.value}</div>
        ))}
      </div>
    </Modal>
  )
}
