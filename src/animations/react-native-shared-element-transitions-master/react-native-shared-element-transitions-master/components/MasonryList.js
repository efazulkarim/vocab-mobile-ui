import { MasonryFlashList } from '@shopify/flash-list'
import React, { useMemo } from 'react'
// import Masonry from 'react-native-masonry-layout';
import { Image, View } from 'react-native'
import { photographyImages } from '../config/data/photography'
import { SPACING, width } from '../config/theme'

export default function MasonryList() {
  const items = useMemo(
    () =>
      [...photographyImages, ...photographyImages].map((image, index) => {
        return {
          height: width * Math.max(0, Math.random()) + width / 4,
          image,
          key: String(index),
        }
      }),
    [],
  )
  return (
    <MasonryFlashList
      numColumns={2}
      // style={{ width }}
      estimatedItemSize={width * 1.5}
      data={items}
      // contentContainerStyle={{ padding: SPACING, paddingBottom: 40 }}
      renderItem={({ item }) => (
        <View
          style={{
            margin: SPACING / 2,
            backgroundColor: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <Image source={{ uri: item.image }} style={{ height: item.height }} />
        </View>
      )}
    />
  )
}
