import React from 'react'
import { Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokePagination } from '../hooks/usePokePagination'
import { styles } from '../theme/appTheme'

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const { isLoading, simplePokemonList } = usePokePagination()
  console.log(isLoading, { simplePokemonList })
  return (
    <>
      <Image source={require('../assets/pokeball.png')} style={styles.pokeballBG} />
      <Text style={{ ...styles.title, ...styles.globalMargin, top: top + 20 }}>Pokedex</Text>
    </>
  )
}
