export function generateRecipeMarkup(recipe) {
  return `
      <div>
          <div>
          <img src="${recipe.image_url}" alt="Recipe Picture" />
          </div>
  
          <div>
          ${recipe.title}
          </div>
  
          <div>
          ${recipe.publisher}
          </div>
      </div>
      `;
}

export function generateSpinnerMarkup() {
  return `
        <div class="loader-container">
          <div class="loader">
            <span></span>
          </div>
        </div>
      `;
}

export function generateErrorMarkup(food) {
  return `
        <div class="error-container">
          <p>
            There are no recipes available for ${food}
          </p>
        </div>
      `;
}
