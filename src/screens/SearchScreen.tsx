import React, { useState } from 'react'
import { View, Platform, FlatList, Text, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Loading } from '../components/Loading'
import { PokemonCard } from '../components/PokemonCard'
import { SearchInput } from '../components/SearchInput'
import { usePokeSearch } from '../hooks/usePokeSearch'
import { SimplePokemon } from '../interfaces/pokemonInterface'
import { styles } from '../theme/appTheme'
import { useEffect } from 'react'

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets()
  const screenWidth = Dimensions.get('window').width

  const { isFetching, simplePokemonList } = usePokeSearch()
  const [term, setTerm] = useState('')
  const [pokeFiltered, setPokeFiltered] = useState<SimplePokemon[]>([])

  useEffect(() => {
    if (term.length === 0) {
      return setPokeFiltered([])
    }

    if (isNaN(Number(term))) {
      setPokeFiltered(
        simplePokemonList.filter((poke) => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
      )
    } else {
      const pokemonById = simplePokemonList.find((poke) => poke.id === term)
      setPokeFiltered(pokemonById ? [pokemonById] : [])
    }
  }, [term])

  if (isFetching) {
    return <Loading />
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? top : top + 10,
        marginHorizontal: 20
      }}
    >
      <SearchInput
        onDebounce={(value) => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 50,
          top: Platform.OS === 'ios' ? top : top + 12
        }}
      />
      <FlatList
        data={pokeFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              marginBottom: 10,
              marginTop: top + 60
            }}
          >
            {term}
          </Text>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  )
}
