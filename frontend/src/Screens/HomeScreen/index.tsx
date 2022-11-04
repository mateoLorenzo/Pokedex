import "./styles.css";
import axios from "axios";
import CustomSearch from "../../Components/CustomSearch/index";
import PokemonCard from "../../Components/PokemonCard/index";
import pokemonLogo from "../../Assets/pokemonLogo.png";
import thinkingPikachu from "../../Assets/thinkingPikachu.png";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PokemonQuickView } from "../../Entities/PokemonQuickView";

const HomeScreen = () => {
  const [pokemonsListToRender, setPokemonsListToRender] = useState<any[]>([]);
  const [pageToTake, setPageToTake] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFirstPage, setLoadingFirstPage] = useState<boolean>(false);
  const [loadingMorePokemons, setLoadingMorePokemons] =
    useState<boolean>(false);
  const [loadingPokemonsSearch, setLoadingPokemonsSearch] =
    useState<boolean>(false);
  const [textSearched, setTextSearched] = useState<string>("");
  const [canLoadMorePokemons, setCanLoadMorePokemons] =
    useState<boolean>(false);
  const [userHasSearchedSomething, setUserHasSearchedSomething] =
    useState<boolean>(false);
  const [noPokemonsWereFound, setNoPokemonsWereFound] =
    useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        setLoadingFirstPage(true);
        const pokemons = await listPokemons(pageToTake, textSearched);
        setPokemonsListToRender((prevPokemons) => [
          ...prevPokemons,
          ...pokemons,
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFirstPage(false);
      }
    })();
  }, []);

  const listPokemons = async (
    pageToTake: number,
    textSearched: string
  ): Promise<PokemonQuickView[]> => {
    setLoading(true);
    const response = await axios.get("http://localhost:3001/pokemons/list/", {
      params: { page: pageToTake, name: textSearched.trim() },
    });
    verifyPokemonExistence(response.data.pokemonsList);
    setPageToTake(pageToTake + 1);
    verifyIfCanLoadMorePages(response.data);
    setLoading(false);
    return toPokemonsQuickView(response.data.pokemonsList);
  };

  const verifyPokemonExistence = (pokemonsList: any[]) => {
    if (pokemonsList.length === 0) {
      setNoPokemonsWereFound(true);
    } else {
      setNoPokemonsWereFound(false);
    }
  };

  const verifyIfCanLoadMorePages = (pokemonsResponse: any) => {
    if (pokemonsResponse.next) {
      setCanLoadMorePokemons(true);
    } else {
      setCanLoadMorePokemons(false);
    }
  };

  const toPokemonsQuickView = (pokemonsList: any[]): PokemonQuickView[] => {
    const pokemonListFiltered = pokemonsList.map((pokemon) => {
      return new PokemonQuickView(
        pokemon.image,
        pokemon.name,
        pokemon.id,
        pokemon.types,
        pokemon.height,
        pokemon.weight
      );
    });
    return pokemonListFiltered;
  };

  const searchPokemons = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    if (textSearched.trim() === "") return;

    setLoadingPokemonsSearch(true);
    const pokemonsResponse = await listPokemons(1, textSearched.toLowerCase());
    setPokemonsListToRender(pokemonsResponse);
    setUserHasSearchedSomething(true);
    setLoadingPokemonsSearch(false);
  };

  const loadMorePokemons = async () => {
    if (loading) return;

    setLoadingMorePokemons(true);
    const pokemonsResponse = await listPokemons(pageToTake, textSearched);
    setPokemonsListToRender([...pokemonsListToRender, ...pokemonsResponse]);
    setLoadingMorePokemons(false);
  };

  const onChangeText = (value: string) => {
    setTextSearched(value);
  };

  const onClearSearch = async () => {
    setLoadingPokemonsSearch(true);
    const pokemonsResponse = await listPokemons(1, "");
    setPokemonsListToRender(pokemonsResponse);
    setUserHasSearchedSomething(false);
    setLoadingPokemonsSearch(false);
    setTextSearched("");
  };

  return (
    <div className="homeScreenContainer">
      {loadingFirstPage && (
        <div className="mainScreenLoaderContainer">
          <div className="mainHomeLoader"></div>
        </div>
      )}
      <img
        src={pokemonLogo}
        onClick={() => history.push("/home")}
        alt="pokemon-logo"
        className="pokemonLogo"
      />
      <div className="homeSearchContainer">
        <CustomSearch
          onClearSearch={onClearSearch}
          textSearched={textSearched}
          onSearch={searchPokemons}
          onChangeText={onChangeText}
          loading={loadingPokemonsSearch}
          userHasSearchedSomething={userHasSearchedSomething}
        />
      </div>
      <div className="homeScreenSubContainer">
        {noPokemonsWereFound && (
          <div className="noPokemonsFoundMessageContainer">
            <div className="noPokemonsFoundMessageSubContainer">
              <img
                src={thinkingPikachu}
                alt="thinking-pikachu"
                className="noPokemonsFoundImage"
              />
              <h3 className="noPokemonsFoundMessageTitle">
                Sorry! No result found...
              </h3>
              <p className="noPokemonsFoundMessage">
                We couldn't found any pokemon that matches your current search.
              </p>
              <p className="noPokemonsFoundMessage">Please try another name!</p>
            </div>
          </div>
        )}
        <div className="pokemonCardsContainer">
          {pokemonsListToRender.map((pokemon: PokemonQuickView) => {
            return (
              <PokemonCard key={pokemon.id} pokemonQuickViewDetails={pokemon} />
            );
          })}
        </div>

        {canLoadMorePokemons && (
          <div className="loadMorePokemonsButton" onClick={loadMorePokemons}>
            {loadingMorePokemons ? (
              <div className="spinner"></div>
            ) : (
              <p className="loadMorePokemonsButtonText">Load More</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
