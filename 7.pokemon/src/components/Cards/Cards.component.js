import React from "react";
import Card from "./../Card/Card.component";
import "./Cards.styles.css";

const Cards = ({ pokemons }) => {
  return (
    <div className="cards">
      {pokemons.map((pokemon, index) => (
        <Card key={index} {...pokemon} />
      ))}
    </div>
  );
};

export default Cards;
