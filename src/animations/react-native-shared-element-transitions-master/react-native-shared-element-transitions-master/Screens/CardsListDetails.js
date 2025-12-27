import { AntDesign, Feather } from '@expo/vector-icons'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import React from 'react'
import { Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../components/Card'
import { innerData } from '../config/data/cards'
import { fonts, height, width } from '../config/theme'
const CARD_WIDTH = width * 0.94
const CARD_HEIGHT = width * 0.6

const xxx = {
  0: { scale: 1, translateY: height / 2 - CARD_WIDTH / 2, rotate: '0deg' },
  1: { scale: 1.2, translateY: 0, rotate: '90deg' },
}

const reverse = {
  0: xxx[1],
  1: xxx[0],
}

const CardsListDetails = ({ navigation, route }) => {
  const { item } = route.params
  const cardRef = React.useRef()
  const translateY = useSharedValue(0)
  // hooks
  const bottomSheetRef = React.useRef(null)

  // variables
  const snapPoints = React.useMemo(() => ['1%', '25%', '50%', '85%'], [])

  // callbacks
  const handleSheetChanges = React.useCallback((fromIndex, toIndex) => {
    console.log('handleSheetChanges', fromIndex, toIndex)
    if (fromIndex !== -1 && toIndex === 0) {
      cardRef.current.animate(reverse, 1000).then(() => {
        navigation.goBack()
      })
    }
  }, [])

  const inputRange = [0, 1, 2, 3]
  const locationButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            inputRange,
            [0, height * 0.1, -CARD_HEIGHT / 4, 0],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            translateY.value,
            inputRange,
            [1, 1, 1, 0.8],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })
  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        inputRange,
        [0, 1, 0, 0],
        // extrapolate: Extrapolate.CLAMP,
      ),
    }
  })
  const ccNumberStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(translateY.value, inputRange, [0, 1, 1, 1]) }
  })
  React.useEffect(() => {
    const xxx = setTimeout(() => {
      bottomSheetRef.current.snapToIndex(1)
    }, 1000)
    return () => {
      clearTimeout(xxx)
    }
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <AntDesign
        name="arrowleft"
        size={28}
        style={{
          padding: 12,
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 2,
        }}
        color={'#fff'}
        onPress={() => {
          bottomSheetRef.current.snapToIndex(0)
          // cardRef.current.animate(reverse, 1000).then(() => {
          //     navigation.goBack();
          // });
        }}
      />
      <Animated.View style={locationButtonStyle}>
        <Animated.View style={textStyle}>
          <Text
            style={{
              ...fonts.montserratBold,
              color: 'white',
              fontSize: 24,
              textAlign: 'center',
            }}
          >
            Your Card
          </Text>
          <Text
            style={{
              ...fonts.montserratRegular,
              color: 'white',
              fontSize: 12,
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            Check all the transactions below
          </Text>
        </Animated.View>
        <Animatable.View
          ref={cardRef}
          easing="ease-in-out-expo"
          animation={xxx}
          useNativeDriver
          delay={50}
          style={{ width, height: width }}
        >
          <Card
            item={item}
            cardHeight={CARD_HEIGHT}
            cardWidth={CARD_WIDTH}
            scale={0.8}
            textStyle={ccNumberStyle}
          />
        </Animatable.View>
      </Animated.View>
      <BottomSheet
        ref={bottomSheetRef}
        animatedIndex={translateY}
        snapPoints={snapPoints}
        onAnimate={handleSheetChanges}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: 'rgba(25,20,28,1)' }}
        handleComponent={() => {
          return (
            <View
              style={{
                padding: 20,
                backgroundColor: 'rgba(25,20,28,1)',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            >
              <Text
                style={{
                  ...fonts.montserratBold,
                  color: 'white',
                  fontSize: 24,
                }}
              >
                Today
              </Text>
            </View>
          )
        }}
      >
        <BottomSheetFlatList
          data={innerData}
          keyExtractor={(item) => item.key}
          style={{ backgroundColor: 'rgba(25,20,28,1)' }}
          renderItem={({ item }) => {
            const s = 48
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    width: s,
                    height: s,
                    borderRadius: s / 2,
                    backgroundColor: item.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 20,
                  }}
                >
                  <Feather name={item.icon} size={24} color="#fff" />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomColor: 'rgba(255,255,255,0.2)',
                    borderBottomWidth: 1,
                    paddingVertical: 20,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        ...fonts.montserratBold,
                        fontSize: 20,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        ...fonts.montserratRegular,
                        fontSize: 12,
                      }}
                    >
                      {item.department}
                    </Text>
                  </View>
                  <Text style={{ ...fonts.montserratBold, color: 'white' }}>
                    {item.ammount}
                  </Text>
                </View>
              </View>
            )
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  )
}

CardsListDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params
  return [
    {
      id: `item.${item.key}.card`,
      animation: 'move',
      resize: 'clip',
      align: 'center-left',
    },
  ]
}

export default CardsListDetails
