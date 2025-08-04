"use client"
import { getTrackBackground, Range } from "react-range";
import { RangeFilterProps } from "./types";
import React from "react";

const RangeFilter = (props: RangeFilterProps) => {
    const { values, setValues, min, max, step, label, maxAsterisk = false } = { ...props }
    const rangeRef: any = React.useRef<Range|null>(null);

    return (
        <div className="flex justify-center flex-wrap bg-gray-200 pt-7 pb-1 px-5 rounded-xl border-2 border-gray-300">
            <Range
                ref={rangeRef}
                labelledBy={label}
                values={values}
                step={step}
                min={min}
                max={max}
                onChange={(values) => setValues(values)}
                key={label}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        className="flex h-[36px] w-full relative"
                    >
                        <div
                            ref={props.ref}
                            className="h-[5px] w-full rounded-sm self-center"
                            style={{ background: 
                                getTrackBackground({
                                    values,
                                    colors: ["#ccc", "#548BF4", "#ccc"],
                                    min: min,
                                    max: max,
                                })
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                /* eslint-disable react/jsx-key */ // Key warning, issue is already reported on github
                renderThumb={({ index, props, isDragged }) => (
                    <div
                        {...props}
                        key={props.key}
                        className="flex justify-center items-center h-[28px] w-[28px] rounded-sm bg-white shadow-md"
                    >
                        <div className={`absolute top-[-28px] text-white font-semibold text-base px-1 rounded-sm ${isDragged ? "bg-sky-500" : "bg-sky-400"}`}>
                            {maxAsterisk && values[index] === max ? "*" : values[index]}
                        </div>
                        <div className={`h-[12px] w-[4px] ${isDragged ? "bg-sky-500" : "bg-gray-200"}`} />
                    </div>
                )}
                /* eslint-enable react/jsx-key */
            />
            <label 
                id={label}
                className="text-sm text-gray-900 font-semibold"
                onClick={(e) => {
                    rangeRef.current.thumbRefs[0].current.focus();
                }}
            >
                {label}
            </label>
        </div>
    )
}

export default RangeFilter;