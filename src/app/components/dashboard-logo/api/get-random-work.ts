const getRandomWork = async () => {
    const response = await fetch(`https://openlibrary.org/search.json?q=cover_i:*+AND+author_key:*+AND+ratings_count:[20 TO *]&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&sort=random&limit=1`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    return response;
}

export default getRandomWork;