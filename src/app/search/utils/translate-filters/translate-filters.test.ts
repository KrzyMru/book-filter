import translateFilters from "./translate-filters";

const fullFilters = {
    author: "true",
    cover: "false",
    author_name: "Name",
    subjects: "subject1,  subject2,subject3",
    person: "Some person",
    place: "Some place",
    ratings_min: "10",
    ratings_max: "150",
    pages_min: "50",
    pages_max: "100",
    publish_year_min: "2020",
    publish_year_max: "2025",
};

const partialFilters = {
    author: "false",
    cover: "true",
    author_name: undefined,
    subjects: "subject1, subject2, subject3",
    person: undefined,
    place: undefined,
    ratings_min: "10",
    ratings_max: "150",
    pages_min: "50",
    pages_max: undefined,
    publish_year_min: undefined,
    publish_year_max: "2025",
}

const emptyFilters = {
    author: undefined,
    cover: undefined,
    author_name: undefined,
    subjects: undefined,
    person: undefined,
    place: undefined,
    ratings_min: undefined,
    ratings_max: undefined,
    pages_min: undefined,
    pages_max: undefined,
    publish_year_min: undefined,
    publish_year_max: undefined,
};

const incorrectFilters = {
    author: "randomString",
    cover: "randomString",
    author_name: undefined,
    subjects: ",,   , s ubject  ,",
    person: undefined,
    place: undefined,
    ratings_min: undefined,
    ratings_max: "randomString",
    pages_min: "randomString",
    pages_max: "*",
    publish_year_min: "randomString",
    publish_year_max: "randomString",
};

describe(translateFilters.name, () => {

    it("correctly translates boolean filters", () => {
        const result = translateFilters(fullFilters);
        expect(result).toContain('+AND+author_key:*');
        expect(result).toContain('+AND+NOT+cover_i:*');
    });

    it("correctly translates content filters", () => {
        const result = translateFilters(fullFilters);
        expect(result).toContain('+AND+author:Name');
        expect(result).toContain('+AND+subject:subject1+subject:subject2+subject:subject3');
        expect(result).toContain('+AND+person:Some person');
        expect(result).toContain('+AND+place:Some place');
    });

    it("correctly translates range filters", () => {
        const result = translateFilters(fullFilters);
        expect(result).toContain('+AND+ratings_count:[10+TO+150]');
        expect(result).toContain('+AND+number_of_pages:[50+TO+100]');
        expect(result).toContain('+AND+first_publish_year:[2020+TO+2025]');
    });

    it("correctly translates partial filters", () => {
        const result = translateFilters(partialFilters);
        expect(result).toContain('+AND+NOT+author_key:*');
        expect(result).toContain('+AND+cover_i:*');
        expect(result).toContain('+AND+subject:subject1+subject:subject2+subject:subject3');
        expect(result).toContain('+AND+ratings_count:[10+TO+150]');
        expect(result).toContain('+AND+number_of_pages:[50+TO+*]');
        expect(result).toContain('+AND+first_publish_year:[*+TO+2025]');
    });

    it("correctly translates empty filters", () => {
        const result = translateFilters(emptyFilters);
        expect(result).toBe('');
    });

    it("correctly translates incorrect filters", () => {
        const result = translateFilters(incorrectFilters);
        expect(result).toContain('+AND+subject:s+ubject');
        expect(result).toContain('+AND+ratings_count:[*+TO+*]');
        expect(result).toContain('+AND+number_of_pages:[*+TO+*]');
        expect(result).toContain('+AND+first_publish_year:[*+TO+*]');
    });

});