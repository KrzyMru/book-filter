import { describe } from "node:test";
import Pagination from "./pagination";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const fullParameters = {
    query: "query",
    sort: "sortType",
    sort_direction: "sortDirection",
    author: "true",
    cover: "false",
    author_name: "Name",
    subjects: "subject1, subject2, subject3",
    person: "Some person",
    place: "Some place",
    ratings_min: "10",
    ratings_max: "150",
    pages_min: "50",
    pages_max: "100",
    publish_year_min: "2020",
    publish_year_max: "2025",
};

const incompleteParameters = {
    query: undefined,
    sort: "sortType",
    sort_direction: "sortDirection",
    author: "true",
    cover: "false",
    subjects: undefined,
    person: "Some person",
    place: "Some place",
    ratings_min: "10",
    ratings_max: undefined,
    pages_min: "50",
    pages_max: "100",
    publish_year_min: undefined,
    publish_year_max: undefined,
};

describe(Pagination.name, () => {

    // 1 2 3 4 5 6 7
    it.each([0, 1, 2, 3, 4, 5, 6, 7])("correctly displays all pages when there are less than 8 total pages", 
        (totalPages) => {
            const { queryAllByRole } = render(<Pagination page={1} totalPages={totalPages} />);
            const links = queryAllByRole("link");
            expect(links).toHaveLength(totalPages);
            if(totalPages !== 0) {
                Array.from({ length: totalPages }, (_, i) => 
                    expect(links[i].textContent).toBe((i+1).toString())
                )
            }
        }
    );

    // 1 2 3 4 ... 8
    it("correctly switches the way pages are displayed when there are at least 8 total pages", () => {
        const { queryAllByRole } = render(<Pagination page={1} totalPages={8} />);
        const links = queryAllByRole("link");
        expect(links).toHaveLength(5);
        expect(links[0].textContent).toBe("1");
        expect(links[1].textContent).toBe("2");
        expect(links[2].textContent).toBe("3");
        expect(links[3].textContent).toBe("4");
        expect(links[4].textContent).toBe("8");
    });

    // 1 2 3 4 ... 10
    it.each([1, 2, 3])("correctly displays 4 first pages and last page when on page %i", 
        (page) => {
            const { getAllByRole } = render(<Pagination page={page} totalPages={10} />);
            const links = getAllByRole("link");
            expect(links).toHaveLength(5);
            expect(links[0].textContent).toBe("1");
            expect(links[1].textContent).toBe("2");
            expect(links[2].textContent).toBe("3");
            expect(links[3].textContent).toBe("4");
            expect(links[4].textContent).toBe("10");
        }
    );

    // 1 ... 3 4 5 ... 10
    it.each([4, 5, 6, 7])("correctly displays first, last, and 3 surrounding pages when on page %i", 
        (page) => {
            const { getAllByRole } = render(<Pagination page={page} totalPages={10} />);
            const links = getAllByRole("link");
            expect(links).toHaveLength(5);
            expect(links[0].textContent).toBe("1");
            expect(links[1].textContent).toBe((page-1).toString());
            expect(links[2].textContent).toBe(page.toString());
            expect(links[3].textContent).toBe((page+1).toString());
            expect(links[4].textContent).toBe("10");
            // There needs to be a gap of at least one number when using a separator (...)
            expect(Number(links[1].textContent)).toBeGreaterThan(2); // 1 ... 3 4 5 ... 10
            expect(Number(links[3].textContent)).toBeLessThan(9); // 1 ... 6 7 8 ... 10
        }
    );

    // 1 ... 7 8 9 10
    it.each([8, 9, 10])("correctly displays 4 last pages and first page when on page %i", 
        (page) => {
            const { getAllByRole } = render(<Pagination page={page} totalPages={10} />);
            const links = getAllByRole("link");
            expect(links).toHaveLength(5);
            expect(links[0].textContent).toBe("1");
            expect(links[1].textContent).toBe("7");
            expect(links[2].textContent).toBe("8");
            expect(links[3].textContent).toBe("9");
            expect(links[4].textContent).toBe("10");
        }
    );

    it("handles the full search parameters correctly", () => {
        const { getAllByRole } = render(<Pagination page={5} totalPages={10} { ...fullParameters } />);
        const links = getAllByRole("link");
        expect(links).toHaveLength(5);
        expect(links[2]).toHaveAttribute("href", 
            "/search"+
            "?query=query"+
            "&author=true"+
            "&cover=false"+
            "&author_name=Name"+
            "&subjects=subject1, subject2, subject3"+
            "&person=Some person"+
            "&place=Some place"+
            "&ratings_min=10"+
            "&ratings_max=150"+
            "&pages_min=50"+
            "&pages_max=100"+
            "&publish_year_min=2020"+
            "&publish_year_max=2025"+
            "&sort=sortType"+
            "&sort_direction=sortDirection"+
            "&page=5"
        );
    });

    it("handles incomplete search parameters correctly", () => {
        const { getAllByRole } = render(<Pagination page={5} totalPages={10} { ...incompleteParameters } />);
        const links = getAllByRole("link");
        expect(links).toHaveLength(5);
        expect(links[2]).toHaveAttribute("href", 
            "/search"+
            "?query="+
            "&author=true"+
            "&cover=false"+
            "&person=Some person"+
            "&place=Some place"+
            "&ratings_min=10"+
            "&pages_min=50"+
            "&pages_max=100"+
            "&sort=sortType"+
            "&sort_direction=sortDirection"+
            "&page=5"
        );
    });

    it("handles undefined search parameters correctly", () => {
        const { getAllByRole } = render(<Pagination page={5} totalPages={10} />);
        const links = getAllByRole("link");
        expect(links).toHaveLength(5);
        expect(links[2]).toHaveAttribute("href", "/search?query=&page=5");
    });

});