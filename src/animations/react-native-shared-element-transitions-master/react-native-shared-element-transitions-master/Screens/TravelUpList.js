import * as React from 'react'
import {
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Directions,
  FlatList,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SharedElement } from 'react-navigation-shared-element'
import GoBack from '../components/GoBack'
import travelup from '../config/data/travelup'
import { SPACING, width } from '../config/theme'

const IMAGE_WIDTH = width * 0.86
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5
const VISIBLE_ITEMS = 4

export default function TravelUpList({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const activeIndex = React.useRef(new Animated.Value(0)).current
  const animatedIndex = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: activeIndex,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  })

  const setActiveIndex = React.useCallback((newIndex) => {
    setSelectedIndex(newIndex)
    activeIndex.setValue(newIndex)
  }, [])

  return (
    <FlingGestureHandler
      key="DOWN"
      direction={Directions.DOWN}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (selectedIndex === travelup.length - 1) {
            return
          }

          setActiveIndex(selectedIndex + 1)
        }
      }}
    >
      <FlingGestureHandler
        key="UP"
        direction={Directions.UP}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (selectedIndex === 0) {
              return
            }

            setActiveIndex(selectedIndex - 1)
          }
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1D1D' }}>
          <GoBack />
          <StatusBar hidden />
          <FlatList
            data={travelup}
            keyExtractor={(item) => item.key}
            scrollEnabled={false}
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [
                style,
                {
                  zIndex: travelup.length - index,
                  left: -IMAGE_WIDTH / 2,
                  top: -IMAGE_HEIGHT / 2,
                },
              ]
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              )
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1]
              const translateY = animatedIndex.interpolate({
                inputRange,
                outputRange: [-30, 0, 30],
              })
              const scale = animatedIndex.interpolate({
                inputRange,
                outputRange: [0.92, 1, 1.1],
              })
              const opacity = animatedIndex.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              })
              return (
                <Animated.View
                  style={{
                    opacity,
                    position: 'absolute',
                    transform: [{ translateY }, { scale }],
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      console.log('asdasdas')
                      navigation.navigate('TravelUpDetails', {
                        item: travelup[selectedIndex],
                      })
                    }}
                  >
                    <SharedElement
                      id={`item.${item.key}.photo`}
                      style={styles.image}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </SharedElement>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        padding: SPACING * 2,
                      }}
                    >
                      <SharedElement id={`item.${item.key}.name`}>
                        <Text
                          style={styles.name}
                          adjustsFontSizeToFit={true}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                      </SharedElement>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  name: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 38,
    fontWeight: '900',
  },
})
