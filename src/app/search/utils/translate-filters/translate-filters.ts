import { FilterRanges } from "../../types";
import { TranslateFiltersProps } from "./types";

const translateFilters = (props: TranslateFiltersProps): string => {
    const { 
        author, cover, author_name, subjects, person, place, 
        ratings_min, ratings_max, pages_min, pages_max,
        publish_year_min, publish_year_max
    } = { ...props };

    const parsedAuthor = author === "false" ? "+AND+NOT+author_key:*" : 
        author === "true" ? "+AND+author_key:*"
        : "";
    const parsedCover = cover === "false" ? "+AND+NOT+cover_i:*" : 
        cover === "true" ? "+AND+cover_i:*" 
        : "";
        
    const parsedAuthorName = author_name ? `+AND+author:${author_name}` : "";
    const parsedSubjects = subjects ? 
        "+AND+"+
        subjects
            .split(',')
            .map(s => s.trim()) 
            .filter(Boolean)
            .map(s => `subject:${s.replaceAll(' ', '+')}`)
            .join('+') 
        : "";
    const parsedPerson = person ? `+AND+person:${person}` : "";
    const parsedPlace = place ? `+AND+place:${place}` : "";
    
    const parsedRatingsMin = !ratings_min || Number.isNaN(Number(ratings_min)) || Number(ratings_min) < FilterRanges.MIN_RATINGS ? "*" : ratings_min;
    const parsedRatingsMax = !ratings_max || Number.isNaN(Number(ratings_max)) || Number(ratings_max) > FilterRanges.MAX_RATINGS ? "*" : ratings_max;
    const parsedRatingRange = (ratings_min || ratings_max) ? `+AND+ratings_count:[${parsedRatingsMin}+TO+${parsedRatingsMax}]` : "";
    
    const parsedPagesMin = !pages_min || Number.isNaN(Number(pages_min)) || Number(pages_min) < FilterRanges.MIN_PAGES ? "*" : pages_min;
    const parsedPagesMax = !pages_max || Number.isNaN(Number(pages_max)) || Number(pages_max) > FilterRanges.MAX_PAGES ? "*" : pages_max;
    const parsedPageRange = (pages_min || pages_max) ? `+AND+number_of_pages:[${parsedPagesMin}+TO+${parsedPagesMax}]` : "";
    
    const parsedPublishYearMin = !publish_year_min || Number.isNaN(Number(publish_year_min)) || Number(publish_year_min) < FilterRanges.MIN_PUBLISH_YEAR ? "*" : publish_year_min;
    const parsedPublishYearMax = !publish_year_max || Number.isNaN(Number(publish_year_max)) || Number(publish_year_max) > FilterRanges.MAX_PUBLISH_YEAR ? "*" : publish_year_max;
    const parsedPublishYearRange = (publish_year_min || publish_year_max) ? `+AND+first_publish_year:[${parsedPublishYearMin}+TO+${parsedPublishYearMax}]` : "";

    return parsedAuthorName+parsedSubjects+parsedPerson+parsedPlace+parsedAuthor+parsedCover+parsedRatingRange+parsedPageRange+parsedPublishYearRange;
}

export default translateFilters;