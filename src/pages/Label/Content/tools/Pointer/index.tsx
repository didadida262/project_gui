import paper from "paper";
import React, { useRef, useEffect } from "react";
import { BsCursor } from "react-icons/bs";
import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import pattern from "@/styles/pattern";

const PointerTool = props => {
  const { activeTool, onClick } = props;
  const name = "pointer";
  let initPoint = new paper.Point(0, 0);
  let cursorPoint = null as any;
  let hitResult = null as any;
  let tool = null as any;
  const hitOptions = {
    // type: fill(类似矩形框)、segment（点）、pixel（raster）
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 2
    // match: hit => {
    //   return !hit.item.hasOwnProperty('indicator') && !hit.item.parent.hasOwnProperty('ignore')
    // }
  };

  const createCursor = point => {
    removeCursor();
    cursorPoint = new paper.Path.Circle({
      center: point,
      radius: 10,
      strokeColor: "black",
      strokeWidth: 5
    });
  };
  const removeCursor = () => {
    if (cursorPoint) {
      cursorPoint.remove();
      cursorPoint = null;
    }
  };
  const handleDragView = e => {
    const delta = initPoint.subtract(e.point);
    const currentProject: paper.Project = paper.project;
    const currentCenter = currentProject.view.center;
    currentProject.view.center = currentCenter.add(delta);
  };
  const handleDragPath = e => {
    const delta = initPoint.subtract(e.point);
    const path = hitResult.item;
    const currentCenter = path.position;
  };
  const initTool = () => {
    tool = new paper.Tool();
    tool.name = name;
    tool.onMouseDown = e => {
      initPoint = e.point;
    };
    tool.onMouseDrag = e => {
      handleDragView(e);
    };
    tool.onMouseMove = e => {
    };
    tool.onMouseUp = e => { };
    tool.activate();
  };
  const switchTool = () => {
    if (activeTool !== name) return;
  };

  useEffect(
    () => {
      initTool();
    },
    []
  );
  return (
    <div className="pencil">
      <ButtonCommon
        className={`w-[80px] h-[40px] ${pattern.flexCenter} ${activeTool === name
          ? "bg-white-5"
          : ""}`}
        type={EButtonType.SIMPLE}
        onClick={() => onClick(name)}
      >
        <BsCursor />
      </ButtonCommon>
    </div>
  );
};

export default PointerTool;
