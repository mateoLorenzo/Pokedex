import "@testing-library/jest-dom"
import { fireEvent, render } from '@testing-library/react'
import CustomSearch from '.';

test('CustomSearch component renders correctly its content', () => {
   const customSearchProps = {
      onClearSearch: () => console.log("onClearIconFunction"),
      textSearched: "example of text searched",
      onSearch: () => console.log("onSearchFunction"),
      onChangeText: () => console.log("onChangeTextFunction"),
      loading: false,
      userHasSearchedSomething: false
   }

   const component = render(
      <CustomSearch
         onClearSearch={customSearchProps.onClearSearch}
         textSearched={customSearchProps.textSearched}
         onSearch={customSearchProps.onSearch}
         onChangeText={customSearchProps.onChangeText}
         loading={customSearchProps.loading}
         userHasSearchedSomething={customSearchProps.userHasSearchedSomething}
      />
   )
   expect(component.getByDisplayValue(customSearchProps.textSearched)).toBeInTheDocument()
   expect(component.getByPlaceholderText("Search Pokemons")).toBeInTheDocument()
   expect(component.getByTestId("search-icon")).toBeInTheDocument()
   expect(component.getByTestId("search-button")).toBeInTheDocument()
})

test("Clicking in search button executes search function", () => {
   const customSearchProps = {
      onClearSearch: () => console.log("onClearIconFunction"),
      textSearched: "example of text searched",
      onSearch: () => console.log("onSearchFunction"),
      onChangeText: () => console.log("onChangeTextFunction"),
      loading: false,
      userHasSearchedSomething: false
   }

   const component = render(
      <CustomSearch
         onClearSearch={customSearchProps.onClearSearch}
         textSearched={customSearchProps.textSearched}
         onSearch={customSearchProps.onSearch}
         onChangeText={customSearchProps.onChangeText}
         loading={customSearchProps.loading}
         userHasSearchedSomething={customSearchProps.userHasSearchedSomething}
      />
   )

   //TODO: Finish submit button test

   const mockHandler = jest.fn()
   const button = component.getByTestId("search-button")
   // fireEvent.click(button)
   fireEvent.submit(button)
   // expect(mockHandler).toHaveBeenCalled()
   // expect(mockHandler.mock.calls).toHaveLength(1)
})

