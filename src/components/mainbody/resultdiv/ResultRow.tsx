import React, { useState } from "react";
import styles from "@/styles/mainbody/resultdiv/ResultRow.module.css";
import ResultRowItems from "./ResultRowItems";
import { useMedia } from "@/hooks/useResponsive";

const ResultRow = () => {
  const belowTabDevice = useMedia("(max-width: 720px)");
  const [showClass, setShowClass] = useState<boolean>(false);

  const show = () => {
    setShowClass(!showClass);
  };

  const rowData = [
    {
      label: "FILTER",
      bgColor: "bg-white",
      height: "h-[40px]",
      width: `${belowTabDevice ? "w-[100px]" : "w-[140px]"}`,
      labelColor: "text-[#425c5a]",
    },
    {
      label: "TICKET OF CLASS",
      bgColor: "bg-white",
      height: "h-[40px]",
      width: `${belowTabDevice ? "w-[120px]" : "w-[180px]"}`,
      labelColor: "text-[#425c5a]",
      picture: "/assets/images/dropDownArrow.png",
    },
  ];
  return (
    <div className={styles.container}>
      <label className="text-[#425c5a] text-ss sm:text-xs mdx:text-base font-semibold">
        RESULT (25)
      </label>
      <div className="flex flex-col items-end relative">
        <div className="flex flex-row w-auto justify-center items-center gap-2">
          {rowData.map((data, index) => (
            <div key={index}>
              <ResultRowItems
                label={data.label}
                bgColor={data.bgColor}
                height={data.height}
                width={data.width}
                labelColor={data.labelColor}
                picture={data.picture}
                getShow={show}
              />
            </div>
          ))}
        </div>
        {showClass && (
          <div className="flex flex-col bg-white w-[170px] h-[auto] absolute top-11 rounded-xl p-4 gap-3">
            <label
              onClick={show}
              className="text-sm font-semibold text-[#425c5a] hover:bg-[#e1eceb] h-[20px] cursor-pointer"
            >
              Economy Class
            </label>
            <label
              onClick={show}
              className="text-sm font-semibold text-[#425c5a] hover:bg-[#e1eceb] h-[20px] cursor-pointer"
            >
              Business Class
            </label>
            <label
              onClick={show}
              className="text-sm font-semibold text-[#425c5a] hover:bg-[#e1eceb] h-[20px] cursor-pointer"
            >
              First Class
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultRow;
