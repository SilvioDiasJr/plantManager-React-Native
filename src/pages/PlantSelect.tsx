import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'

import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'
import { EnviromentButton } from '../components/EnviromentButton'

import api from '../services/api'
import { PlantProps } from '../libs/storage'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
  key: string
  title: string
}

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [enviromentSelected, setEnviromentSelected] = useState('all')
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const navigation = useNavigation()

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

    if (!data)
      return setLoading(true)

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }

    setLoading(false)
    setLoadingMore(false)
  }

  function handleEnviromentSelected(enviroment: string) {
    setEnviromentSelected(enviroment)

    if (enviroment === 'all')
      return setFilteredPlants(plants)

    const filtered = plants.filter(plant =>
      plant.environments.includes(enviroment)
    )

    setFilteredPlants(filtered)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return

    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  function handlePlantSelect(plant: PlantProps){
    navigation.navigate('PlantSave', { plant })
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ])
    }

    fetchEnviroment()

  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  if (loading)
    return <Load />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View style={styles.enviromentListContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
        />
      </View>

      <View
        style={styles.plants}
      >
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ?
            <ActivityIndicator color={colors.green_dark} />
            : <></>
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentListContainer: {
    width: '100%',
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 30,
    marginVertical: 30,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  }
})