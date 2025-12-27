import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { SharedElement } from 'react-navigation-shared-element'
import { fonts, width } from '../config/theme'

const Card = React.memo(
  ({ item, cardWidth, cardHeight, textStyle, scale = 1, onPress }) => {
    const style = textStyle ? textStyle : { opacity: 0 }
    return (
      <SharedElement id={`item.${item.key}.card`}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              flex: 1,
              width: width,
              height: width,
              transform: [{ scale }],
              alignItems: 'center',
              justifyContent: 'flex-start',
              // backgroundColor: 'rgba(255, 0,0, 0.4)'
            },
          ]}
        >
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ rotate: '-90deg' }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={onPress}>
              <View
                style={{
                  borderRadius: 20,
                  padding: 20,
                  width: cardWidth,
                  height: cardHeight,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: item.imageUri }}
                  style={[StyleSheet.absoluteFillObject, { borderRadius: 20 }]}
                />
                <BlurView
                  style={[StyleSheet.absoluteFillObject]}
                  tint="default"
                  intensity={100}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={[
                      styles.textShadow,
                      {
                        ...fonts.montserratBold,
                        fontSize: 22,
                        color: '#fff',
                        opacity: 0.85,
                      },
                    ]}
                  >
                    Credit Card
                  </Text>
                  <MaterialCommunityIcons
                    name="contactless-payment"
                    size={36}
                    color="#fff"
                    style={{ opacity: 0.9 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Image
                    source={{
                      uri: 'https://user-images.githubusercontent.com/2805320/94189589-375e2180-feab-11ea-8de9-87f68d964f36.png',
                    }}
                    style={{
                      width: 48,
                      height: 48,
                      opacity: 0.75,
                      marginRight: 20,
                    }}
                  />
                  <Animated.View style={{ ...style, flex: 1 }}>
                    <Text
                      style={[
                        styles.textShadow,
                        {
                          ...fonts.montserratBold,
                          letterSpacing: 1,
                          color: '#fff',
                          opacity: 0.85,
                          fontSize: 20,
                        },
                      ]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {item.cc}
                    </Text>
                  </Animated.View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View>
                    <Text
                      style={[
                        styles.textShadow,
                        {
                          ...fonts.montserratRegular,
                          textTransform: 'uppercase',
                          fontSize: 9,
                          color: '#fff',
                          opacity: 0.85,
                          marginBottom: 4,
                        },
                      ]}
                    >
                      Card Holder
                    </Text>
                    <Text
                      style={[
                        styles.textShadow,
                        {
                          ...fonts.montserratBold,
                          fontSize: 14,
                          color: '#fff',
                          opacity: 0.85,
                        },
                      ]}
                    >
                      {item.holder}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: item.type }}
                    style={{ height: 44, width: 50, resizeMode: 'contain' }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SharedElement>
    )
  },
)

const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    shadowOpacity: 0.1,
  },
})

export default Card
