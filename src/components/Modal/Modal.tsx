import React from 'react';
import './Modal.css'; // 引入样式文件
import { cn } from '@/utils/cn';
import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // 如果未打开，则不渲染

  return (
    <div className={cn(
      "fixed bg-black bg-opacity-50 left-0 right-0 top-0 bottom-0",
      "flex justify-center items-center z-1000",
      " transition-transform duration-1000 transform",
      "animationFadeIn"
    )} onClick={onClose}>
      <div className={
        cn(
          "modal-content",
          "w-[500px] h-auto relative",
          "border-[1px] border-solid border-borderSecondColor",
          "bg-bgPrimaryColor"
        )
      } onClick={(e) => e.stopPropagation()}>
        <h2 className={cn(
          "modal-title",
          "border-b-[3px] border-solid border-borderSecondColor",
        )}>{title}</h2>
        <div>{children}</div>
        <div className={cn(
          "w-full flex justify-end items-center"
        )}>
          <ButtonCommon
            type={EButtonType.SIMPLE}
            className={cn(
            )}
            onClick={onClose}
          >

            关闭
          </ButtonCommon>
        </div>

      </div>
    </div >
  );
};

export default Modal;
