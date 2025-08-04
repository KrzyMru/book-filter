interface RangeFilterProps {
    values: number[],
    setValues: (values: number[]) => void,
    min: number,
    max: number,
    step: number,
    label: string,
    maxAsterisk?: boolean,
}

type userSortType = "relevance" | "rating" | "trending" | "reading log" | "want to read" | "currently reading" | "already read" | "publish year" | "editions";

export type { RangeFilterProps, userSortType }