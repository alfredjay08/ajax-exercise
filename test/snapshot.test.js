import {
  generateRecipeMarkup,
  generateSpinnerMarkup,
  generateErrorMarkup,
} from "./snapshot";
import { expect, fixture, html } from "@open-wc/testing";

describe("Checking Markup Generation", () => {
  it("should return a recipe markup row correctly and should be accessible", async () => {
    const markup = generateRecipeMarkup({
      image_url: "http://google.com",
      title: "Burger",
      publisher: "Alfred Jay",
    });

    const recipeRowEl = await fixture(markup);
    expect(recipeRowEl).dom.to.equal(`
    <div>
        <div>
            <img src="http://google.com" alt="Recipe Picture" />
        </div>

        <div>
            Burger
        </div>

        <div>
            Alfred Jay
        </div>
    </div>
    `);

    await expect(recipeRowEl).to.be.accessible();
  });

  it("should return spinner markup, has correct classes", async () => {
    const markup = generateSpinnerMarkup();
    const spinnerEl = await fixture(markup);

    expect(spinnerEl).dom.to.equal(`
    <div class="loader-container">
        <div class="loader">
            <span></span>
        </div>
    </div>
    `);

    expect(spinnerEl).to.have.class("loader-container");
  });

  it("should return error markup, has correct classes", async () => {
    const markup = generateErrorMarkup("pizza");
    const errorEl = await fixture(markup);

    expect(markup).to.include(`There are no recipes available for`);
    expect(markup).to.include(`pizza`);

    expect(errorEl).to.have.class("error-container");
  });
});
