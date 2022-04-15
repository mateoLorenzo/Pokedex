import "@testing-library/jest-dom"
import { render, fireEvent } from '@testing-library/react';
import PokemonCard from ".";

test("PokemonCard component renders correctly its content", () => {
   const component = render(
      <PokemonCard
         pokemonQuickViewDetails={
            {
               image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
               name: "Ivysaur",
               id: 2,
               types: ["Grass, Poison"],
               height: 10,
               weight: 130,
            }
         }
      />
   )
   expect(component.getByText("Ivysaur")).toBeInTheDocument()
   expect(component.getByText("View Detail")).toBeInTheDocument()
   expect(component.getByTestId("pokemon-card-image")).toBeInTheDocument()
   expect(component.getByTestId("pokemon-card-divisor-line")).toBeInTheDocument()
   expect(component.getByAltText("left-transparent-pokeball")).toBeInTheDocument()
   expect(component.getByAltText("right-transparent-pokeball")).toBeInTheDocument()
})

test("On pressing a pokemonCard redirects correctly to detail", () => {
   //TODO: fix redirect 

   // const mockHandler = jest.fn()
   // const detailButton = component.getByTestId("pokemon-card-sub-container")
   // expect(detailButton).toBeInTheDocument()
   // fireEvent.click(detailButton)
   // expect(mockHandler).toHaveBeenCalled()
})


