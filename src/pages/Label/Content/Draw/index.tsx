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

  useEffect(() => {
    initCanvas();
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
