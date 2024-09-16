export const words: string[] = [
  "white",
  "snow",
  "ivory",
  "pearl",
  "alabaster",
  "chalk",
  "milk",
  "cream",
  "eggshell",
  "vanilla",
  "frost",
  "cloud",
  "cotton",
  "linen",
  "porcelain",
  "bleached",
  "pale",
  "fair",
  "blank",
  "pure",
  "clean",
  "bright",
  "light",
  "whitewash",
  "flour",
  "silver",
  "moonlight",
];

export const generateText = () => {
  return words
    .sort(() => 0.5 - Math.random())
    .slice(0, 50)
    .join(" ");
};
