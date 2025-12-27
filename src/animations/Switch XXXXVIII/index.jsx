// Inspiration: https://dribbble.com/shots/4707036-Switcher-XXXVIII

import * as React from 'react';
import { StatusBar, Pressable, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { MotiView } from 'moti';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const _colors = {
  on: 'rgba(72,233,138, 1)',
  off: 'rgba(253,69,80, 1)',
};
function AwesomeSwitch({ size = 64, onValueChange, value = false, disabled = false }) {
  const [switchState, setSwitchState] = React.useState(value);
  const switchStateValue = useSharedValue(value ? 1 : 0);
  const _onPress = React.useCallback(() => {
    onValueChange?.(!switchState);
    setSwitchState(!switchState);
    switchStateValue.value = withSpring(!switchState ? 1 : 0);
  }, [onValueChange, value, switchState]);

  const v = useDerivedValue(() => {
    return interpolateColor(switchStateValue.value, [0, 1], [_colors.off, _colors.on]);
  });

  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: v.value,
      shadowColor: v.value,
    };
  });

  const _sizes = React.useMemo(
    () => ({
      track: size,
      thumb: size / 2,
      border: size / 6,
    }),
    [size],
  );

  return (
    <Pressable disabled={disabled} onPress={_onPress}>
      <Animated.View
        // animate={{
        //   backgroundColor: switchState ? _colors.on : _colors.off,
        //   shadowColor: switchState ? _colors.on : _colors.off
        // }}
        // transition={{
        //   type: 'timing',
        //   easing: Easing.linear
        // }}
        style={[
          {
            width: _sizes.track,
            height: _sizes.track,
            borderRadius: _sizes.track / 2,
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: _sizes.border,
            shadowColor: '#000',
            elevation: _sizes.border
          },
          stylez,
        ]}
      >
        <MotiView
          animate={{
            width: switchState ? 0 : _sizes.thumb,
            borderWidth: switchState ? _sizes.border * 0.67 : _sizes.border,
          }}
          style={{ height: _sizes.thumb, borderRadius: _sizes.thumb / 2, borderColor: '#fff' }}
        />
      </Animated.View>
    </Pressable>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <AwesomeSwitch size={32} />
      <View style={{ marginVertical: 8 }} />
      <AwesomeSwitch />
      <View style={{ marginVertical: 8 }} />
      <AwesomeSwitch size={128} />
      <View style={{ marginVertical: 8 }} />
      <AwesomeSwitch size={180} />
      <View style={{ marginVertical: 8 }} />
      <AwesomeSwitch size={128} />
      <View style={{ marginVertical: 8 }} />
      <AwesomeSwitch />
      <View style={{ marginVertical: 8 }} />
      <AwesomeSwitch size={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
