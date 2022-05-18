import React, { useCallback, useRef } from "react";
import { useVirtual } from "react-virtual";
import { FileObject } from "../../utils/utils";
import ListItem from "./ListItem";

type Props = {
  images: FileObject[];
  filter: string;
};

export default function ListLayout({ images, filter }: Props) {
  const parentRef = useRef() as any;
  const rowVirtualizer = useVirtual({
    size: images.filter((image) => image.name.includes(filter)).length || 0,
    parentRef,
    estimateSize: useCallback(() => 70, []),
    overscan: 5,
  });
  return (
    <div
      className=" flex align-items-start align-content-top w-full justify-content-center"
      style={{
        height: "90vh",
      }}
    >
      <div
        ref={parentRef}
        className="w-10"
        style={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={`flex ${
                virtualRow.index % 2
                  ? "FileBrowserListItemOdd"
                  : "FileBrowserListItemEven"
              }`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ListItem
                name={
                  images.filter((image) => image.name.includes(filter))[
                    virtualRow.index
                  ].name || ""
                }
              />
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
}
