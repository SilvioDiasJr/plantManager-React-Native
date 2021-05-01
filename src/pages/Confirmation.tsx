import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

export function Confirmation() {
  const navigation = useNavigation()
  const routes = useRoute()

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,

  } = routes.params as Params

  function handleMoveOn() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 96,
    marginBottom: 64,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginBottom: 16,
    lineHeight: 30,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 25
  },
  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 40,
  },
})