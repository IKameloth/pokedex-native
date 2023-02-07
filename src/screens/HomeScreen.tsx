import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FadeInImage } from '../components/FadeInImage'
import { usePokePagination } from '../hooks/usePokePagination'
import { styles } from '../theme/appTheme'
import { PokemonCard } from '../components/PokemonCard'

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const { isLoading, simplePokemonList, loadPokemons } = usePokePagination()

  return (
    <>
      <Image source={require('../assets/pokeball.png')} style={styles.pokeballBG} />
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10
              }}
            >
              Pokedex
            </Text>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={<ActivityIndicator style={{ height: 100 }} size={20} color="grey" />}
        />
      </View>
    </>
  )
}
