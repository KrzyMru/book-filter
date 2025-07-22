import { WorkSnippetProps } from "./components/types";

interface WorkTitleSearchResponse {
    start: number,
    num_found: number,
    docs: WorkSnippetProps[],
}

export type { WorkTitleSearchResponse }