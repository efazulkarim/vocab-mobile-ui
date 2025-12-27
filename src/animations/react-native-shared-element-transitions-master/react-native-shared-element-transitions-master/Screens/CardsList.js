import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { FlatList, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../components/Card'
import GoBack from '../components/GoBack'
import cards from '../config/data/cards'
import { width } from '../config/theme'

const CARD_WIDTH = width * 0.94
const CARD_HEIGHT = width * 0.6

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)

export default function CardsList({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <GoBack />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={cards}
        keyExtractor={(item) => item.key}
        horizontal
        snapToInterval={width * 0.64 + 20}
        decelerationRate="fast"
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                height: CARD_HEIGHT,
                width: width * 0.64,
                marginRight: 20,
              }}
            >
              <Card
                item={item}
                cardWidth={CARD_WIDTH}
                scale={1}
                cardHeight={CARD_HEIGHT}
                onPress={() =>
                  navigation.navigate('CardsListDetails', { item })
                }
              />
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
