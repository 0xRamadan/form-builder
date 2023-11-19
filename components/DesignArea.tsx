"use client";

import DesignDropArea from "./DesignDropArea";
import DesignSidebarArea from "./DesignSidebarArea";

const DesignArea = () => {
  return (
    <div className="flex h-full w-full">
      <DesignDropArea />
      <DesignSidebarArea />
    </div>
  );
};

export default DesignArea;
