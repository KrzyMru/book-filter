import { WorkSnippetProps } from "./components/types";

interface WorkSearchResponse {
    start: number,
    num_found: number,
    docs: WorkSnippetProps[],
}

export type { WorkSearchResponse }