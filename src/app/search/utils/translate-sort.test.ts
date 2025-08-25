import translateSort from "./translate-sort";

describe(translateSort.name, () => {

    it("returns sort type used by API with appropriate sort direction", () => {
        expect(translateSort('rating')).toBe('rating desc');
        expect(translateSort('rating', 'desc')).toBe('rating desc');
        expect(translateSort('rating', 'asc')).toBe('rating asc');
        expect(translateSort('trending')).toBe('trending desc');
        expect(translateSort('trending', 'desc')).toBe('trending desc');
        expect(translateSort('trending', 'asc')).toBe('trending asc');
        expect(translateSort('publish year')).toBe('new');
        expect(translateSort('publish year', 'desc')).toBe('new');
        expect(translateSort('publish year', 'asc')).toBe('old');
    });

    it("returns sort type used by API ignoring sort direction", () => {
        expect(translateSort('relevance')).toBe('');
        expect(translateSort('relevance', 'desc')).toBe('');
        expect(translateSort('relevance', 'asc')).toBe('');
        expect(translateSort('reading log')).toBe('readinglog');
        expect(translateSort('reading log', 'desc')).toBe('readinglog');
        expect(translateSort('reading log', 'asc')).toBe('readinglog');
        expect(translateSort('already read')).toBe('already_read');
        expect(translateSort('already read', 'desc')).toBe('already_read');
        expect(translateSort('already read', 'asc')).toBe('already_read');
        expect(translateSort('currently reading')).toBe('currently_reading');
        expect(translateSort('currently reading', 'desc')).toBe('currently_reading');
        expect(translateSort('currently reading', 'asc')).toBe('currently_reading');
        expect(translateSort('want to read')).toBe('want_to_read');
        expect(translateSort('want to read', 'desc')).toBe('want_to_read');
        expect(translateSort('want to read', 'asc')).toBe('want_to_read');
        expect(translateSort('editions')).toBe('editions');
        expect(translateSort('editions', 'desc')).toBe('editions');
        expect(translateSort('editions', 'asc')).toBe('editions');
    });

    it("handles edge cases correctly", () => {
        expect(translateSort('randomString' as any)).toBe('');
        expect(translateSort('randomString' as any, 'desc')).toBe('');
        expect(translateSort('randomString' as any, 'asc')).toBe('');
        expect(translateSort('randomString' as any, 'randomString' as any)).toBe('');
        expect(translateSort('rating', 'randomString' as any)).toBe('rating desc');
        expect(translateSort('trending', 'randomString' as any)).toBe('trending desc');
        expect(translateSort('publish year', 'randomString' as any)).toBe('new');
        expect(translateSort()).toBe('');
        expect(translateSort(undefined, 'desc')).toBe('');
        expect(translateSort(undefined, 'asc')).toBe('');
        expect(translateSort(undefined, 'randomString' as any)).toBe('');
    });

});