export const getIngrediantImage = (name: string) => {
  const ingrediant = ingrediants.find((i) =>
    name.toLocaleLowerCase().endsWith(i.name),
  );
  return ingrediant ? ingrediant.img : null;
};

export const ingrediants = [
  { name: "all-purpose flour", img: require("@/assets/ingrediants/flour.png") },
  {
    name: "basmati rice",
    img: require("@/assets/ingrediants/basmatirice.png"),
  },
  {
    name: "beef broth concentrate",
    img: require("@/assets/ingrediants/beefbroth.png"),
  },
  {
    name: "cajun spice blend",
    img: require("@/assets/ingrediants/cajunspiceblend.png"),
  },
  { name: "canned corn", img: require("@/assets/ingrediants/cannedcorn.png") },
  { name: "carrot", img: require("@/assets/ingrediants/carrot.png") },
  {
    name: "cheddar cheese, shredded",
    img: require("@/assets/ingrediants/cheddarcheese.png"),
  },
  {
    name: "chicken broth concentrate",
    img: require("@/assets/ingrediants/beefbroth.png"),
  },
  {
    name: "chicken tenders",
    img: require("@/assets/ingrediants/chickentenders.png"),
  },
  {
    name: "corn kernals",
    img: require("@/assets/ingrediants/cornkernals.png"),
  },
  { name: "cornstarch", img: require("@/assets/ingrediants/cornstarch.png") },
  {
    name: "feta cheese, crumbled",
    img: require("@/assets/ingrediants/fetacheese.png"),
  },
  {
    name: "flour tortillas",
    img: require("@/assets/ingrediants/flourtortillas.png"),
  },
  { name: "garlic salt", img: require("@/assets/ingrediants/garlicsalt.png") },
  { name: "garlic", img: require("@/assets/ingrediants/garlic.png") },
  {
    name: "ginger-garlic puree",
    img: require("@/assets/ingrediants/gingergarlicpuree.png"),
  },
  {
    name: "grape tomatoes",
    img: require("@/assets/ingrediants/grapetomatoes.png"),
  },
  { name: "green onion", img: require("@/assets/ingrediants/greenonion.png") },
  {
    name: "green bell pepper",
    img: require("@/assets/ingrediants/greenbellpepper.png"),
  },
  { name: "ground beef", img: require("@/assets/ingrediants/groundbeef.png") },
  {
    name: "honey-garlic sauce",
    img: require("@/assets/ingrediants/honeygarlicsauce.png"),
  },
  { name: "hot pepper", img: require("@/assets/ingrediants/hotpepper.png") },
  { name: "hot sauce", img: require("@/assets/ingrediants/hotsauce.png") },
  { name: "lemon", img: require("@/assets/ingrediants/lemon.png") },
  { name: "lime", img: require("@/assets/ingrediants/lime.png") },
  {
    name: "mexican seasoning",
    img: require("@/assets/ingrediants/mexicanseasoning.png"),
  },
  {
    name: "monterey jack cheese, shredded",
    img: require("@/assets/ingrediants/montereyjackcheese.png"),
  },
  { name: "oil", img: require("@/assets/ingrediants/oil.png") },
  { name: "parsley", img: require("@/assets/ingrediants/parsley.png") },
  { name: "pepper", img: require("@/assets/ingrediants/pepper.png") },
  {
    name: "pork chops, boneless",
    img: require("@/assets/ingrediants/pork.png"),
  },
  {
    name: "red potato",
    img: require("@/assets/ingrediants/redpotatoes.png"),
  },
  { name: "red onion", img: require("@/assets/ingrediants/redonion.png") },
  {
    name: "salmon fillets, skinless",
    img: require("@/assets/ingrediants/salmon.png"),
  },
  { name: "salt", img: require("@/assets/ingrediants/salt.png") },
  {
    name: "salt and pepper",
    img: require("@/assets/ingrediants/saltandpepper.png"),
  },
  { name: "shrimp", img: require("@/assets/ingrediants/shrimp.png") },
  { name: "sour cream", img: require("@/assets/ingrediants/sourcream.png") },
  { name: "soy sauce", img: require("@/assets/ingrediants/soysauce.png") },
  { name: "sugar", img: require("@/assets/ingrediants/sugar.png") },
  {
    name: "sugar snap peas",
    img: require("@/assets/ingrediants/sugarsnappeas.png"),
  },
  { name: "tomato", img: require("@/assets/ingrediants/tomato.png") },
  {
    name: "unsalted butter",
    img: require("@/assets/ingrediants/unsaltedbutter.png"),
  },
  {
    name: "yellow onion",
    img: require("@/assets/ingrediants/yellowonion.png"),
  },
  {
    name: "yogurt sauce",
    img: require("@/assets/ingrediants/yogurtsauce.png"),
  },
  { name: "zucchini", img: require("@/assets/ingrediants/zucchini.png") },
];
