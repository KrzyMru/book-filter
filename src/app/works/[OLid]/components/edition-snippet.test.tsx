import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditionSnippet from './edition-snippet';

const completeEdition = {
  key: "Key",
  title: "Work title",
  publish_date: "2025",
  edition_name: "Edition name",
  covers: ["cover1", "cover2"],
  publishers: ["publisher1", "publisher2"],
  contributors: [{role: "role1", name: "name1"}, {role: "role2", name: "name2"}],
};

const incompleteEdition = {
  key: "Key",
  title: "Work title",
};

describe(EditionSnippet.name, () => {

  it("uses correct link attributes", () => {
    const { getByTitle } = render(<EditionSnippet edition={completeEdition} />);
    const link = getByTitle(completeEdition.title);
    expect(link).toHaveAttribute("href", completeEdition.key);
  });

  it("uses correct cover in src attribute", () => {
    const { getByAltText } = render(<EditionSnippet edition={completeEdition} />);
    const cover = getByAltText("Edition cover");
    expect(cover.getAttribute("src")).toContain("cover1");
  });

  it("uses fallback when no cover is provided", () => {
    const { getByAltText } = render(<EditionSnippet edition={incompleteEdition} />);
    const cover = getByAltText("Edition cover");
    expect(cover.getAttribute("src")).toContain("fallback-cover.jpg");
  });

  it("displays its information", () => {
    const { queryByText } = render(<EditionSnippet edition={completeEdition} />);
    const name = queryByText(completeEdition.edition_name);
    const publishers = queryByText(completeEdition.publishers.join(', '));
    const date = queryByText(completeEdition.publish_date);
    expect(name).toBeInTheDocument();
    expect(publishers).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });

});