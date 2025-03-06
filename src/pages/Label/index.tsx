import { message } from "antd";
import cn from "classnames";
import paper from "paper";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/components/Modal/Modal";


import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import DrawComponent from "./Content/Draw";
import { MockPicData, MockCategories, MockBaseParams } from '@/mock/label'
import { getRandomIntegers } from '@/utils/paperjsWeapon'
const LabelComponent = () => {
  const [activeTool, setactiveTool] = useState("");
  const [currentPic, setcurrentPic] = useState() as any;
  const [targetData, settargetData] = useState() as any
  const [isOpenbaseparams, setisOpenbaseparams] = useState(false)
  const [isOpen, setisOpen] = useState(false);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setcurrentPic({
        id: 0,
        src: imageUrl
      });
    }
  };
  const getData = () => {
    setcurrentPic(MockPicData[0])
  }
  const handleEventCallback = (data) => {
    setisOpen(true)
  }
  const handleClickBaseParams = () => {
    console.log('handleClickBaseParams>>>')
    setisOpenbaseparams(true)
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    console.log('currentPic>>>', currentPic)
    if (!currentPic) return
    const rand = getRandomIntegers(5, 0, 100).sort((a, b) => a - b)
    console.warn('生成>>>>rand', rand)
    settargetData(rand)
  }, [currentPic])
  return (
    <div
      className={cn(
        `w-full h-full label px-[10px] py-[10px]`,
        "flex flex-col justify-between items-center"
      )}
    >
      <div className={cn(
        "bot w-full h-full",
        "flex justify-between items-center flex-col"
      )}>
        <div className={cn(
          "w-full h-[100px]",
          "flex justify-center items-center"
        )}>
          <span className="text-[40px] select-none">大场景图像处理与智能筛选系统</span>
        </div>
        <div className={cn(
          "h-[calc(100%_-_170px)] w-full rounded-[4px]",
          "border-[3px] border-solid border-[#0099ff]"
        )}>
          <DrawComponent activeTool={activeTool} currentPic={currentPic} targetData={targetData} handleEventCallback={handleEventCallback} />
        </div>
        <div className={cn(
          "h-[60px] w-full rounded-[4px]",
          "flex justify-between items-center"
        )}>
          <div className={cn(
            "left",
            "w-[calc(50%_-_10px)] h-full",
            "border-[1px] border-solid border-borderSecondColor",
            "flex justify-start items-center gap-x-2",
            "px-common py-common"
          )}>
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className={cn(
              )}
              onClick={() => {
                const dom = document.getElementById('file-input')
                dom && dom.click()
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-input"
                className="hidden"
              />
              文件读取
            </ButtonCommon>
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className={cn(
              )}
            >
              计算控制
            </ButtonCommon>
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className={cn(
              )}
              onClick={() => (handleClickBaseParams())}
            >
              基本参数显示
            </ButtonCommon>
          </div>
          <div className={
            cn(
              "right",
              "w-[calc(50%_-_10px)] h-full",
              "border-[1px] border-solid border-borderSecondColor",
              "flex justify-start items-center gap-x-2",
              "px-common py-common"
            )
          }>
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className={cn(
                "!border-[0px]"
              )}
            >
              筛得区域统计：
            </ButtonCommon>
            <span>{targetData ? targetData.join(' , ') : ''}</span>

          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => { setisOpen(false) }} title={'目标区域'}>
        <div className={cn(
          "w-full h-[400px] relative",
          "flex justify-center items-center overflow-hidden",

        )}>
          <img src={MockPicData[0].src} alt="" className={cn(
            "object-contain max-w-full max-h-full",
            "select-none",
            "border-[2px] border-dashed border-[red]",

          )} />
        </div>
      </Modal>
      <Modal isOpen={isOpenbaseparams} onClose={() => { setisOpenbaseparams(false) }} title={'基本参数显示'}>
        <div className={cn(
          "w-full h-auto relative",
          "flex justify-start items-start overflow-hidden flex-col gap-y-4",
          "py-[20px]"

        )}>
          {MockBaseParams.map((item, index) => (
            <div key={index}>{item.name + ': ' + item.value}</div>
          ))}

        </div>
      </Modal>
    </div >
  );
};

export default LabelComponent;
