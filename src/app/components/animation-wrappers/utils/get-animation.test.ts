import getAnimation from "./get-animation";

describe(getAnimation.name, () => {

  it("returns correct animation for header variant", () => {
    expect(getAnimation("header")).toBe("animate-slide-in-header");
  });

  it("returns correct animation for work variant", () => {
    expect(getAnimation("work")).toBe("animate-slide-in-work");
  });

  it("returns nothing for wrong variant", () => {
    expect(getAnimation("")).toBe("");
    expect(getAnimation("a")).toBe("");
  });

});