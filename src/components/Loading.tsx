import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="grey" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
