import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterface'
import { FadeInImage } from './FadeInImage'
import ImageColors from 'react-native-image-colors'
import { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

interface Props {
  pokemon: SimplePokemon
}

const windowWidth = Dimensions.get('window').width

export const PokemonCard = ({ pokemon }: Props) => {
  const [bgColor, setBgColor] = useState('grey')
  const isMounted = useRef(true)
  const navigation = useNavigation<any>()

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, { fallback: 'grey' }).then((colors) => {
      if (!isMounted.current) return

      if (colors.platform === 'android') {
        setBgColor(colors.dominant || 'grey')
      }
      if (colors.platform === 'ios') {
        setBgColor(colors.background || 'grey')
      }
    })
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor })}
    >
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor
        }}
      >
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokeballContainer}>
          <Image source={require('../assets/pokeball-white.png')} style={styles.pokeball} />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokeImage} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.5
  },
  pokeImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden'
  }
})
