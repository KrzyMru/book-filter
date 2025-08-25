import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkSnippet from './work-snippet';

const completeWork = {
  key: "Key",
  title: "Work title",
  cover_i: "7438261",
  ratings_count: 1323,
  ratings_average: 4.2,
  already_read_count: 231,
  currently_reading_count: 532,
  want_to_read_count: 331,
}

const incompleteWork = {
  key: "Key",
  title: "Work title",
}

describe(WorkSnippet.name, () => {

  it("uses correct link attributes", () => {
    const { getByTitle } = render(<WorkSnippet work={completeWork} />);
    const link = getByTitle(completeWork.title);
    expect(link).toHaveAttribute("href", completeWork.key);
  });

  it("uses correct src attribute when cover_id is provided", () => {
    const { getByAltText } = render(<WorkSnippet work={completeWork} />);
    const cover = getByAltText("Work cover");
    expect(cover.getAttribute("src")).toContain(completeWork.cover_i);
  });

  it("uses fallback when cover_id is not provided", () => {
    const { getByAltText } = render(<WorkSnippet work={incompleteWork} />);
    const cover = getByAltText("Work cover");
    expect(cover.getAttribute("src")).toContain("fallback-cover.jpg");
  });

  it("displays rating correctly when provided", () => {
    const { queryByText, getByTestId } = render(<WorkSnippet work={completeWork} />);
    const ratingsCount = queryByText(`${completeWork.ratings_count} ratings`);
    const ratingsAverage = getByTestId("ratingsAverage");
    expect(ratingsCount).toBeInTheDocument();
    expect(ratingsAverage.textContent).toBe(completeWork.ratings_average.toFixed(2));
  });

  it("displays rating correctly when not provided", () => {
    const { queryByText, getByTestId } = render(<WorkSnippet work={incompleteWork} />);
    const ratingsCount = queryByText("0 ratings");
    const ratingsAverage = getByTestId("ratingsAverage");
    expect(ratingsCount).toBeInTheDocument();
    expect(ratingsAverage.textContent).toBe("0");
  });

});