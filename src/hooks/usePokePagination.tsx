import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi'
import { PokemonResponse, Result, SimplePokemon } from '../interfaces/pokemonInterface'

export const usePokePagination = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
  const nextPageRef = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')

  const loadPokemons = async () => {
    setIsLoading(true)
    const response = await pokemonApi.get<PokemonResponse>(nextPageRef.current)
    nextPageRef.current = response.data.next
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
    setSimplePokemonList([...simplePokemonList, ...newPokemonList])
    setIsLoading(false)
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  return { isLoading, simplePokemonList, loadPokemons }
}
