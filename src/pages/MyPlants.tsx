import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text, Alert } from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { formatDistance } from 'date-fns/esm'
import pt from 'date-fns/esm/locale/pt/index.js'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../components/Header'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'
import { loadPlant, PlantProps, removePlant, StoragePlantProps } from '../libs/storage'

import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant()

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} daqui a ${nextTime}`
      )

      setMyPlants(plantsStoraged)
      setLoading(false)
    }

    loadStorageData()
  }, [myPlants])

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id)

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            )

          } catch (error) {
            Alert.alert('Não foi possível remover! 😥')
          }
        }
      }
    ])
  }

  if (loading)
    return <Load />

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image
          source={waterdrop}
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
          </Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})