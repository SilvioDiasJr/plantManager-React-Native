import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../styles/colors'

interface ButtomProps {
  title: string;
}

export function Buttom({ title }: ButtomProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={.7}
    >
      <Text style={styles.buttontext}>
        {title}
    </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    height: 56,
    width: 56,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },
  buttontext: {
    color: colors.white,
    fontSize: 24,
  }
})