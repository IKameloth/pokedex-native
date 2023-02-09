import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PokemonFull } from '../interfaces/pokemonInterface'
import { FadeInImage } from './FadeInImage'

interface Props {
  pokemon: PokemonFull
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject
      }}
    >
      <View
        style={{
          ...styles.container,
          marginTop: 400
        }}
      >
        <Text style={styles.title}>Types</Text>
        <View style={{ flexDirection: 'row' }}>
          {pokemon.types.map(({ type }) => (
            <Text style={{ ...styles.regularText, marginRight: 10 }} key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text style={styles.title}>Weight</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.regularText, fontWeight: 'bold' }} key={pokemon.weight}>
              {pokemon.weight}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text style={styles.title}>Sprites</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
            <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
            <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
            <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
            <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
            <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
          </ScrollView>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Abilities</Text>
          <View style={{ flexDirection: 'row' }}>
            {pokemon.abilities.map(({ ability }) => (
              <Text style={{ ...styles.regularText, marginRight: 10 }} key={ability.name}>
                {ability.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Moves</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {pokemon.moves.map(({ move }) => (
              <Text style={{ ...styles.regularText, marginRight: 10 }} key={move.name}>
                {move.name}
              </Text>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Stats</Text>
          <View>
            {pokemon.stats.map((stat, index) => (
              <View key={stat.stat.name + index} style={{ flexDirection: 'row' }}>
                <Text style={{ ...styles.regularText, marginRight: 10, width: 150 }}>{stat.stat.name}:</Text>
                <Text style={{ ...styles.regularText, fontWeight: 'bold' }}>{stat.base_stat}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  regularText: {
    fontSize: 19
  },
  basicSprite: {
    width: 100,
    height: 100
  }
})
