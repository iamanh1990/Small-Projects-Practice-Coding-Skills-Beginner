export const getTypes = (types) => {
  const type = types.map((obj) => obj.type.name).join(", ");
  return type;
};

export const getImage = (sprites) => {
  const url = sprites.other["official-artwork"]["front_default"];
  return url;
};
