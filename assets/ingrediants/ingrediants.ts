export const getIngrediantImage = (name: string) => {
  if (!name) {
    return null;
  }

  const ingrediant = ingrediants.find((i) => name.toLowerCase() == i.name);
  return ingrediant ? ingrediant.img : null;
};

export const ingrediants = [
  {
    name: "arborio rice",
    img: require("@/assets/ingrediants/arboriorice.png"),
  },
  {
    name: "artisan bun",
    img: require("@/assets/ingrediants/artisanbun.png"),
  },
  { name: "all-purpose flour", img: require("@/assets/ingrediants/flour.png") },
  {
    name: "baby spinach",
    img: require("@/assets/ingrediants/babyspinach.png"),
  },
  {
    name: "basmati rice",
    img: require("@/assets/ingrediants/basmatirice.png"),
  },
  {
    name: "beef broth concentrate",
    img: require("@/assets/ingrediants/beefbroth.png"),
  },
  {
    name: "beyond meat",
    img: require("@/assets/ingrediants/beyondmeat.png"),
  },
  { name: "brown sugar", img: require("@/assets/ingrediants/sugar.png") },
  {
    name: "bulgur wheat",
    img: require("@/assets/ingrediants/bulgurwheat.png"),
  },
  {
    name: "butternut squash",
    img: require("@/assets/ingrediants/butternutsquash.png"),
  },
  {
    name: "cajun spice blend",
    img: require("@/assets/ingrediants/cajunspiceblend.png"),
  },
  {
    name: "cauliflower",
    img: require("@/assets/ingrediants/cauliflower.png"),
  },
  { name: "canned corn", img: require("@/assets/ingrediants/cannedcorn.png") },
  { name: "carrot", img: require("@/assets/ingrediants/carrot.png") },
  {
    name: "cheddar cheese",
    img: require("@/assets/ingrediants/cheddarcheese.png"),
  },
  {
    name: "chicken breasts",
    img: require("@/assets/ingrediants/chickenbreasts.png"),
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
    name: "cilantro",
    img: require("@/assets/ingrediants/cilantro.png"),
  },
  {
    name: "chili pepper",
    img: require("@/assets/ingrediants/chilipepper.png"),
  },
  {
    name: "coconut milk",
    img: require("@/assets/ingrediants/coconutmilk.png"),
  },
  {
    name: "corn kernals",
    img: require("@/assets/ingrediants/cornkernals.png"),
  },
  { name: "cornstarch", img: require("@/assets/ingrediants/cornstarch.png") },
  {
    name: "cremini mushrooms",
    img: require("@/assets/ingrediants/creminimushrooms.png"),
  },
  {
    name: "cream sauce spice blend",
    img: require("@/assets/ingrediants/creamsaucespiceblend.png"),
  },
  {
    name: "crispy shallots",
    img: require("@/assets/ingrediants/crispyshallots.png"),
  },
  {
    name: "crushed tomatoes with garlic and onion",
    img: require("@/assets/ingrediants/crushedtomatoeswithgarlicandonion.png"),
  },
  {
    name: "dal spice blend",
    img: require("@/assets/ingrediants/dalspiceblend.png"),
  },
  {
    name: "diced tomatoes",
    img: require("@/assets/ingrediants/dicedtomatoes.png"),
  },
  {
    name: "dill-garlic spice blend",
    img: require("@/assets/ingrediants/dill-garlicspiceblend.png"),
  },
  {
    name: "dijon mustard",
    img: require("@/assets/ingrediants/dijonmustard.png"),
  },
  {
    name: "feta cheese",
    img: require("@/assets/ingrediants/fetacheese.png"),
  },
  {
    name: "fig spread",
    img: require("@/assets/ingrediants/figspread.png"),
  },
  {
    name: "flour tortillas",
    img: require("@/assets/ingrediants/flourtortillas.png"),
  },
  {
    name: "garlic puree",
    img: require("@/assets/ingrediants/garlicpuree.png"),
  },
  {
    name: "gala apple",
    img: require("@/assets/ingrediants/galaapple.png"),
  },
  { name: "garlic salt", img: require("@/assets/ingrediants/garlicsalt.png") },
  { name: "garlic", img: require("@/assets/ingrediants/garlic.png") },
  {
    name: "ginger",
    img: require("@/assets/ingrediants/ginger.png"),
  },
  {
    name: "ginger-garlic puree",
    img: require("@/assets/ingrediants/gingergarlicpuree.png"),
  },
  {
    name: "gochujang",
    img: require("@/assets/ingrediants/gochujang.png"),
  },
  {
    name: "granny smith apple",
    img: require("@/assets/ingrediants/grannysmithapple.png"),
  },
  {
    name: "grape tomatoes",
    img: require("@/assets/ingrediants/grapetomatoes.png"),
  },
  {
    name: "gravy spice blend",
    img: require("@/assets/ingrediants/gravyspiceblend.png"),
  },
  {
    name: "greek yogurt",
    img: require("@/assets/ingrediants/greekyogurt.png"),
  },
  { name: "green beans", img: require("@/assets/ingrediants/greenbeans.png") },
  { name: "green onion", img: require("@/assets/ingrediants/greenonion.png") },
  {
    name: "green bell pepper",
    img: require("@/assets/ingrediants/greenbellpepper.png"),
  },
  { name: "ground beef", img: require("@/assets/ingrediants/groundbeef.png") },
  { name: "ground pork", img: require("@/assets/ingrediants/groundpork.png") },
  {
    name: "honey-garlic sauce",
    img: require("@/assets/ingrediants/honeygarlicsauce.png"),
  },
  {
    name: "honey",
    img: require("@/assets/ingrediants/honey.png"),
  },
  { name: "hot pepper", img: require("@/assets/ingrediants/hotpepper.png") },
  { name: "hot sauce", img: require("@/assets/ingrediants/hotsauce.png") },
  {
    name: "italian breadcrumbs",
    img: require("@/assets/ingrediants/italianbreadcrumbs.png"),
  },
  {
    name: "jalapeño",
    img: require("@/assets/ingrediants/Jalapeño.png"),
  },
  {
    name: "jasmine rice",
    img: require("@/assets/ingrediants/jasminerice.png"),
  },
  {
    name: "ketchup",
    img: require("@/assets/ingrediants/ketchup.png"),
  },
  {
    name: "kidney beans",
    img: require("@/assets/ingrediants/kidneybeans.png"),
  },
  { name: "lemon", img: require("@/assets/ingrediants/lemon.png") },
  { name: "lemongrass", img: require("@/assets/ingrediants/lemongrass.png") },
  {
    name: "lemon-pepper seasoning",
    img: require("@/assets/ingrediants/lemon-pepperseasoning.png"),
  },
  { name: "lime", img: require("@/assets/ingrediants/lime.png") },
  {
    name: "mayonnaise",
    img: require("@/assets/ingrediants/mayonnaise.png"),
  },
  {
    name: "maple syrup",
    img: require("@/assets/ingrediants/maplesyrup.png"),
  },
  {
    name: "mexican seasoning",
    img: require("@/assets/ingrediants/mexicanseasoning.png"),
  },
  {
    name: "milk",
    img: require("@/assets/ingrediants/milk.png"),
  },
  {
    name: "mini cucumber",
    img: require("@/assets/ingrediants/minicucumber.png"),
  },
  {
    name: "mirepoix",
    img: require("@/assets/ingrediants/mirepoix.png"),
  },
  {
    name: "miso broth concentrate",
    img: require("@/assets/ingrediants/misobrothconcentrate.png"),
  },
  {
    name: "montreal steak spice",
    img: require("@/assets/ingrediants/montrealsteakspice.png"),
  },
  {
    name: "monterey jack cheese",
    img: require("@/assets/ingrediants/montereyjackcheese.png"),
  },
  {
    name: "mushrooms",
    img: require("@/assets/ingrediants/mushrooms.png"),
  },
  { name: "oil", img: require("@/assets/ingrediants/oil.png") },
  { name: "orange", img: require("@/assets/ingrediants/orange.png") },
  { name: "parsley", img: require("@/assets/ingrediants/parsley.png") },
  { name: "pepper", img: require("@/assets/ingrediants/pepper.png") },
  {
    name: "plant-based protein shreds",
    img: require("@/assets/ingrediants/plant-basedproteinshreds.png"),
  },
  {
    name: "pork chops",
    img: require("@/assets/ingrediants/pork.png"),
  },
  {
    name: "pork tenderloin",
    img: require("@/assets/ingrediants/porktenderloin.png"),
  },
  {
    name: "radish",
    img: require("@/assets/ingrediants/radish.png"),
  },
  {
    name: "red cabbage",
    img: require("@/assets/ingrediants/redcabbage.png"),
  },
  {
    name: "red curry paste",
    img: require("@/assets/ingrediants/redcurrypaste.png"),
  },
  {
    name: "red lentils",
    img: require("@/assets/ingrediants/redlentils.png"),
  },
  {
    name: "red potato",
    img: require("@/assets/ingrediants/redpotatoes.png"),
  },
  { name: "red onion", img: require("@/assets/ingrediants/redonion.png") },
  {
    name: "rice vinegar",
    img: require("@/assets/ingrediants/ricevinegar.png"),
  },
  {
    name: "russet potato",
    img: require("@/assets/ingrediants/russetpotato.png"),
  },
  {
    name: "salmon fillets",
    img: require("@/assets/ingrediants/salmon.png"),
  },
  {
    name: "salmon - fillets",
    img: require("@/assets/ingrediants/salmon-fillets.png"),
  },
  { name: "salt", img: require("@/assets/ingrediants/salt.png") },
  {
    name: "salt and pepper",
    img: require("@/assets/ingrediants/saltandpepper.png"),
  },
  {
    name: "sea bass",
    img: require("@/assets/ingrediants/seabass.png"),
  },
  {
    name: "sesame oil",
    img: require("@/assets/ingrediants/sesameoil.png"),
  },
  {
    name: "sesame seeds",
    img: require("@/assets/ingrediants/sesameseeds.png"),
  },
  {
    name: "shallot",
    img: require("@/assets/ingrediants/shallot.png"),
  },
  {
    name: "shanghai bok choy",
    img: require("@/assets/ingrediants/shanghaibokchoy.png"),
  },
  {
    name: "shawarma spice blend",
    img: require("@/assets/ingrediants/shawarmaspiceblend.png"),
  },
  {
    name: "sriracha",
    img: require("@/assets/ingrediants/sriracha.png"),
  },
  {
    name: "smoked paprika-garlic blend",
    img: require("@/assets/ingrediants/smokedpaprika-garlicblend.png"),
  },
  {
    name: "spicy mayo",
    img: require("@/assets/ingrediants/spicymayo.png"),
  },
  {
    name: "spring mix",
    img: require("@/assets/ingrediants/springmix.png"),
  },
  { name: "shrimp", img: require("@/assets/ingrediants/shrimp.png") },
  {
    name: "sprouted brown rice",
    img: require("@/assets/ingrediants/sproutedbrownrice.png"),
  },
  { name: "sour cream", img: require("@/assets/ingrediants/sourcream.png") },
  { name: "soy sauce", img: require("@/assets/ingrediants/soysauce.png") },
  { name: "sugar", img: require("@/assets/ingrediants/sugar.png") },
  {
    name: "sunflower seeds",
    img: require("@/assets/ingrediants/sunflowerseeds.png"),
  },
  {
    name: "sweet bell pepper",
    img: require("@/assets/ingrediants/sweetbellpepper.png"),
  },
  {
    name: "sweet chili sauce",
    img: require("@/assets/ingrediants/sweetchilisauce.png"),
  },
  {
    name: "sugar snap peas",
    img: require("@/assets/ingrediants/sugarsnappeas.png"),
  },
  {
    name: "tilapia fillets",
    img: require("@/assets/ingrediants/tilapiafillets.png"),
  },
  { name: "tomato", img: require("@/assets/ingrediants/tomato.png") },
  {
    name: "tomato salsa",
    img: require("@/assets/ingrediants/tomatosalsa.png"),
  },
  {
    name: "tex-mex paste",
    img: require("@/assets/ingrediants/tex-mexpaste.png"),
  },
  {
    name: "thai seasoning",
    img: require("@/assets/ingrediants/thaiseasoning.png"),
  },
  {
    name: "thyme",
    img: require("@/assets/ingrediants/thyme.png"),
  },
  {
    name: "vegetable broth concentrate",
    img: require("@/assets/ingrediants/vegetablebrothconcentrate.png"),
  },
  {
    name: "vegetarian oyster sauce",
    img: require("@/assets/ingrediants/vegetarianoystersauce.png"),
  },
  {
    name: "unsalted butter",
    img: require("@/assets/ingrediants/unsaltedbutter.png"),
  },
  {
    name: "white wine vinegar",
    img: require("@/assets/ingrediants/whitewinevinegar.png"),
  },
  {
    name: "worcestershire sauce",
    img: require("@/assets/ingrediants/worcestershiresauce.png"),
  },
  {
    name: "yellow onion",
    img: require("@/assets/ingrediants/yellowonion.png"),
  },
  {
    name: "yellow potato",
    img: require("@/assets/ingrediants/yellowpotato.png"),
  },
  {
    name: "yogurt sauce",
    img: require("@/assets/ingrediants/yogurtsauce.png"),
  },
  { name: "zucchini", img: require("@/assets/ingrediants/zucchini.png") },
];
