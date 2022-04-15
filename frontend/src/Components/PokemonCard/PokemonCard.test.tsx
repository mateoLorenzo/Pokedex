import PokemonCard from ".";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const MockedPokemonCard = () => {
  return (
    <PokemonCard
      pokemonQuickViewDetails={{
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        name: "Pikachu",
        id: 25,
        types: ["Electric"],
        height: 4,
        weight: 60,
      }}
    />
  );
};

describe("PokemonCard", () => {
  render(<MockedPokemonCard />);

  const cardImage = screen.getByTestId("pokemon-card-image");
  const cardDivisorLine = screen.getByTestId("pokemon-card-divisor-line");
  const cardPokemonName = screen.getByText("Pikachu");
  const cardLeftPokeBallIcon = screen.getByAltText(
    "pokemon-card-left-pokeball"
  );
  const cardRightPokeBallIcon = screen.getByAltText(
    "pokemon-card-right-pokeball"
  );
  const cardViewDetailButton = screen.getByTestId(
    "pokemon-card-quickView-button"
  );
  const detailButton = screen.getByTestId("pokemon-card-sub-container");

  it("should render correctly", () => {
    expect(cardImage).toBeInTheDocument();
    expect(cardDivisorLine).toBeInTheDocument();
    expect(cardPokemonName).toBeInTheDocument();
    expect(cardLeftPokeBallIcon).toBeInTheDocument();
    expect(cardRightPokeBallIcon).toBeInTheDocument();
    expect(cardViewDetailButton).toBeInTheDocument();
    expect(detailButton).toBeInTheDocument();
  });
});
