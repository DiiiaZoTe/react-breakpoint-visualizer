"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import useBreakpoint from "use-breakpoint";
import { BreakpointsType } from "./types";

export const BreakpointVisualizer = ({
  breakpoints,
}: {
  breakpoints: BreakpointsType;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const sortedBreakpoints = useMemo(() => {
    return Object.entries(breakpoints)
      .map((entry, index, array) => {
        const [name, min] = entry;
        const max =
          index === array.length - 1 ? undefined : array[index + 1][1];
        return { name, min, max };
      })
      .reverse();
  }, [breakpoints]);

  const { breakpoint } = useBreakpoint(breakpoints, sortedBreakpoints[0].name);

  return !isVisible ? (
    <button
      onClick={() => setIsVisible(true)}
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 10000,
        backgroundColor: "rgba(255,255,255,0.2)",
        border: "none",
        padding: "4px",
        color: "white",
        cursor: "pointer",
        fontSize: "12px",
        borderRadius: "4px",
      }}
    >
      Open
    </button>
  ) : (
    <div
      style={{
        position: "sticky",
        top: "0px",
        width: "100%",
        zIndex: 9998,
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: "absolute",
          right: "10px",
          zIndex: 10000,
          backgroundColor: "rgba(255,255,255,0.2)",
          border: "none",
          padding: "4px",
          color: "white",
          cursor: "pointer",
          fontSize: "12px",
          borderRadius: "4px",
        }}
      >
        Close
      </button>

      {sortedBreakpoints.map(({ name, min, max }, index) => (
        <div
          key={name}
          style={{
            zIndex: 9998,
            paddingLeft: "2px",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "0px",
            height: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            border: "1px solid grey",
            borderTop: "0",
            borderColor: "rgb(75,75,75)",
            width: max ? `${max}px` : "100%",
            minWidth: `${min}px`,
            ...(index === 0 ? { borderLeft: "0", borderRight: "0" } : {}),
          }}
        >
          <p
            style={{
              fontSize: "small",
              color: "rgb(75,75,75)",
              paddingLeft: "10px;",
            }}
          >
            {name}
          </p>
        </div>
      ))}
      <p style={{ position: "relative", zIndex: 9999, color: "white" }}>
        {breakpoint}
      </p>
    </div>
  );
};
