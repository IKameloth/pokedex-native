import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi'
import { PokemonResponse, Result, SimplePokemon } from '../interfaces/pokemonInterface'

export const usePokeSearch = () => {
  const [isFetching, setIsFetching] = useState<Boolean>(true)
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])

  const loadPokemons = async () => {
    const response = await pokemonApi.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon/?limit=1280')
    mapPokemonList(response.data.results)
  }

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const urlPart = url.split('/')
      const id = urlPart[urlPart.length - 2]
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      return {
        id,
        picture,
        name
      }
    })
    setSimplePokemonList(newPokemonList)
    setIsFetching(false)
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  return { isFetching, simplePokemonList }
}
