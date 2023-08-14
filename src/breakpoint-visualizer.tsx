"use client";

import * as React from "react";
import { useMemo } from "react";
import useBreakpoint from "use-breakpoint";
import { BreakpointsType } from "./types";

export const BreakpointVisualizer = ({
  breakpoints,
}: {
  breakpoints: BreakpointsType;
}) => {
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

  const { breakpoint } = useBreakpoint(breakpoints, "2xl");

  return (
    <div className="sticky top-0 w-full z-40 h-10 flex justify-center items-center overflow-hidden bg-white dark:bg-black">
      {sortedBreakpoints.map(({ name, min, max }, index) => (
        <div
          key={name}
          className={
            "pl-2 flex items-center absolute top-0 h-full left-1/2 -translate-x-1/2 border border-t-0 bg-white dark:bg-black " +
            (index === 0 ? "border-l-0 border-r-0" : "")
          }
          style={{ width: max ? `${max}px` : "100%", minWidth: `${min}px` }}
        >
          <p className="text-sm text-black/50 dark:text-white/50">{name}</p>
        </div>
      ))}
      <p className="z-50">{breakpoint}</p>
    </div>
  );
};
