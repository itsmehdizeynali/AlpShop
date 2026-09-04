"use client";

import { Range, getTrackBackground } from "react-range";
import { useState } from "react";
import Text from "./text";


export default function PriceRange({
  min=0,
  step=10,
  max=100,
}: {
  min: number;
  step: number;
  max: number;
}) {
  const [values, setValues] = useState([min, max]);

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between text-sm">
        <Text color="black">{values[0].toLocaleString()} $</Text>
        <Text color="black">{values[1].toLocaleString()} $</Text>
      </div>

      <div className="px-1.5">
        <Range
          values={values}
          step={step}
          min={min}
          max={max}
          onChange={(values: number[]) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full rounded-full"
              style={{
                ...props.style,
                background: getTrackBackground({
                  values,
                  colors: ["#e5e7eb", "#034289", "#e5e7eb"],
                  min: min,
                  max: max,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              className="h-3 w-3 rounded-full bg-primary shadow"
            />
          )}
        />
      </div>
    </div>
  );
}
