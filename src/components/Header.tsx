import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userImg from '../assets/silvio.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
  const [username, setUsername] = useState<string>()

 useEffect(() => {
  async function loadStorageUsername() {
    const user = await AsyncStorage.getItem('@plantmanager:user')
    setUsername(user || '')
  }

  loadStorageUsername()
 },[])


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá, </Text>
        <Text style={styles.userName}>{username}</Text>
      </View>
      <Image source={userImg} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 99,
  }

})