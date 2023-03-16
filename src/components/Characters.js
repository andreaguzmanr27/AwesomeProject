import React, { Component } from "react";
import CharactersCards from "./CharactersCards";

class Characters extends Component {

  render() {
    return (
      <CharactersCards navigation={this.props.navigation} />
    );
  }
};

export default Characters;
