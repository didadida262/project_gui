import paper from "paper";
import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";

import { showPoint, drawGrid, drawGridV2, removeLayer, drawHasTarget } from "@/utils/paperjsWeapon";
import "./index.scss";
import { cn } from "@/utils/cn";

const DrawComponent = props => {
  const { targetData, activeTool, currentPic, handleEventCallback, contentLoading } = props;
  const canvasRef = useRef(null) as any;
  const [zoom, setZoom] = useState(1);
  const setCursorPointer = () => {
    switch (activeTool) {
      case "pointer":
        canvasRef.current.style.cursor = "pointer";
        break;
      case "rect":
        canvasRef.current.style.cursor = "crosshair";
        break;
      case "pencil":
        canvasRef.current.style.cursor = "crosshair";
        break;
      case "brushv2":
        canvasRef.current.style.cursor = "crosshair";
        break;
      case "brush":
        canvasRef.current.style.cursor = "none";
        break;
    }
  };
  const initCanvas = () => {
      paper.setup(canvasRef.current);
  };

  const drawPic = () => {
    if (!currentPic || !currentPic.src) return
    console.log('paper>>>', paper)
    removeLayer(paper.project, "layerPic");
    const layerPic = new paper.Layer()
    layerPic.name = "layerPic";
    const raster = new paper.Raster(currentPic.src);
    raster.onLoad = () => {
      raster.fitBounds(paper.view.bounds, false);
      const info = {
        type: 'picloaded',
      }
      handleEventCallback(info)
    };
  };

  const drawOtherLayers = () => {
    setTimeout(() => {
      const layerPic = paper.project.layers.filter((layer) => layer.name === 'layerPic')[0]
      const layerPic_children = layerPic.children
      const bound = layerPic_children[0].bounds
      drawGridV2(paper.project, bound.topLeft, bound.bottomRight)
      drawHasTarget(paper.project, targetData, handleEventCallback)
    }, 200)
  }
  const changeZoom = (delta, p) => {
    let currentProject = paper.project;
    let view = currentProject.view;
    let oldZoom = view.zoom;
    let c = view.center;
    let factor = 0.11 + zoom;

    let newZoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
    let beta = oldZoom / newZoom;
    let pc = p.subtract(c);
    let a = p.subtract(pc.multiply(beta)).subtract(c);
    console.warn('changeZoom>>>', { zoom: newZoom, offset: a })
    return { zoom: newZoom, offset: a };
  };
  const handleWheel = (event) => {
    event.preventDefault(); // 防止默认滚动行为
    // 获取滚轮的 deltaY 属性，判断滚动方向
    const delta = event.deltaY;
    // // 更新视图的缩放比例和中心点
    const viewPoint = {
      x: event.offsetX,
      y: event.offsetY
    };
    console.log("viewPoint>>>", viewPoint);
    const newPoint = paper.project.view.viewToProject(viewPoint);
    const { zoom, offset } = changeZoom(delta, newPoint);
    console.log("newPoint>>>", newPoint);
    console.log("delta>>>", delta);
    paper.view.zoom = zoom;
    paper.view.center = paper.view.center.add(offset);


    // // 根据滚轮增量进行缩放或其他操作
    // if (delta > 0) {
    //   console.log('向下滚动');
    //   // 进行缩小操作
    // } else {
    //   console.log('向上滚动');
    //   // 进行放大操作
    // }
  }
  const addMouseWheel = () => {
    const canvas = canvasRef.current
    // 添加滚轮事件监听
    canvas.addEventListener('wheel', handleWheel);
  }

  useEffect(() => {
    initCanvas();
    // addMouseWheel()
    // return () => {
    //   if (canvasRef.current) {
    //     canvasRef.current.removeEventListener('wheel', handleWheel);
    //   }
    // }
  }, []);

  useEffect(
    () => {
      setCursorPointer();
    },
    [activeTool]
  );
  useEffect(() => {
    drawPic();
    drawOtherLayers()
  }, [currentPic])
  useEffect(() => {
    drawOtherLayers()
  }, [targetData])
  return (
    <div
      className={
        cn(
          "draw relative",
        )
      }
    >
      <canvas ref={canvasRef} className={cn(
        "w-full h-full",
        contentLoading ? "opacity-0" : 'opacity-100'
      )} />
    </div>
  );
};

export default DrawComponent;
