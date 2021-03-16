import React, { Component } from "react";
import Cards from "./Cards/Cards.component";
import "./App.styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemons: [],
    };
  }

  fetchPokemon = async (url) => {
    const response = await fetch(url);
    const data = response.json();
    return data;
  };

  componentDidMount = async () => {
    let url = "https://pokeapi.co/api/v2/pokemon/";
    const pokemons = [];

    //looping to get the data
    for (let i = 1; i <= 150; i++) {
      const pokemon = await this.fetchPokemon(`${url}${i}`);
      pokemons.push(pokemon);
    }
    //setState
    this.setState({
      pokemons,
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Quick's Pokedex</h1>
        <Cards pokemons={this.state.pokemons} />
      </div>
    );
  }
}

export default App;
