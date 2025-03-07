import { createBrowserRouter } from "react-router-dom";

import ColorProvider from "@/pages/Label/ColorProvider";

import LabelComponent from "../pages/Label";

// 路由懒加载

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <ColorProvider>
            <LabelComponent />
          </ColorProvider>
        )
      }
    ]
  }
]);
export default router;
