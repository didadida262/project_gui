import { message } from "antd";
import cn from "classnames";
import paper from "paper";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import DrawComponent from "./Content/Draw";
import { MockPicData, MockCategories } from '@/mock/label'

const LabelComponent = () => {
  const [activeTool, setactiveTool] = useState("");
  const [currentPic, setcurrentPic] = useState() as any;
  const getData = () => {
    setcurrentPic(MockPicData[0])
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
        <div className={cn("h-[calc(100%_-_65px)] w-full rounded-[4px] border-[1px] border-solid border-borderSecondColor")}>
          <DrawComponent activeTool={activeTool} currentPic={currentPic} />
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
            >
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

    </div>
  );
};

export default LabelComponent;
