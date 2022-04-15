import CustomSearch from ".";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const MockedCustomSearch = ({ mockOnSearch }: any) => {
  const mock = jest.fn();

  return (
    <CustomSearch
      loading={false}
      onSearch={mockOnSearch}
      onChangeText={mock}
      onClearSearch={mock}
      userHasSearchedSomething={false}
      textSearched={"example of text searched"}
    />
  );
};

describe("CustomSearch", () => {
  const mockOnSearch = jest.fn();
  render(<MockedCustomSearch mockOnSearch={mockOnSearch} />);

  const searchIcon = screen.getByTestId("search-icon");
  const searchButton = screen.getByTestId("search-button");
  const searchInput = screen.getByPlaceholderText("Search Pokemons");

  it("should render correctly", () => {
    expect(searchInput).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("should allow the user to type in the search input", () => {
    fireEvent.change(searchInput, { target: { value: "pika" } });
    expect(searchInput).toHaveValue("pika");
  });
});
