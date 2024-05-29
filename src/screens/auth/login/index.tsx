import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';

const Dashboard = () => {
  const [isOn, setIsOn] = useState(false);
  const [pulseAnimation] = useState(new Animated.Value(0));
  const [buttonColor, setButtonColor] = useState('#FF5733'); // Red color for off state, Green color for on state

  useEffect(() => {
    animatePulse();
  }, [isOn]);

  const animatePulse = () => {
    if (isOn) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 0,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnimation.setValue(0); // Reset pulse animation
    }
  };

  const toggleButton = () => {
    setIsOn(!isOn);
    setButtonColor(isOn ? '#FF5733' : '#4CAF50'); // Toggle button color
  };

  const pulseStyle:any = {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
    opacity: pulseAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.4],
    }),
    transform: [
      {
        scale: pulseAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {isOn && <Animated.View style={[styles.pulse, pulseStyle]} />}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={toggleButton}
        activeOpacity={0.6}
      >
        <Text style={styles.buttonText}>{isOn ? 'ON' : 'OFF'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 800
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pulse: {
    position: 'absolute',
  },
});

export default Dashboard;
