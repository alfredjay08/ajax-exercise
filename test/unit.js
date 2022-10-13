export async function getRecipes(food) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${food}`
    );
    const json = await res.json();

    return json.recipes;
  } catch (err) {
    throw err;
  }
}
