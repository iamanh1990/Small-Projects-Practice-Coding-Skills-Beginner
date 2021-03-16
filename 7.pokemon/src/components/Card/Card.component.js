import React from "react";
import "./Card.styles.css";
import { getTypes, getImage } from "../../utils/utils";

const Card = ({ id, name, types, sprites }) => {
  return (
    <div className="card">
      <img className="card_img" src={getImage(sprites)} alt={`${name}`} />
      <h3>{`${id}. ${name}`}</h3>
      <p>{`Types: ${getTypes(types)}`}</p>
    </div>
  );
};

export default Card;
