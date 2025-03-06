import { message } from "antd";
import cn from "classnames";
import paper from "paper";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/components/Modal/Modal";


import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import DrawComponent from "./Content/Draw";
import { MockPicData, MockCategories } from '@/mock/label'

const LabelComponent = () => {
  const [activeTool, setactiveTool] = useState("");
  const [currentPic, setcurrentPic] = useState() as any;
  const [isOpen, setisOpen] = useState(true);
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
    console.log('测试>>>>??????????', data)
    setisOpen(true)

  }
  useEffect(() => {
    getData()

  }, [])
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
          <DrawComponent activeTool={activeTool} currentPic={currentPic} handleEventCallback={handleEventCallback} />
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
              )}
            >
              筛得区域统计
            </ButtonCommon>

          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => { setisOpen(false) }} title={'目标区域'}>
        <div className={cn(
          "w-full h-[400px] relative",
          "flex justify-center items-center overflow-hidden"
        )}>
          <img src={MockPicData[0].src} alt="" className={cn(
            "object-contain max-w-full max-h-full",
            "select-none"
          )} />
        </div>
      </Modal >
    </div >
  );
};

export default LabelComponent;
