import { getRecipes } from "./unit";
import { expect } from "@esm-bundle/chai";

describe("Validating unit", () => {
  it("should validate data from GET request", async () => {
    const recipeData = await getRecipes("pizza");
    expect(recipeData.length).to.not.equal(0);
    expect(JSON.stringify(recipeData)).to.include("publisher");
    expect(JSON.stringify(recipeData)).to.include("title");
    expect(JSON.stringify(recipeData)).to.include("image_url");
  });
});
