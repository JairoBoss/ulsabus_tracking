import React from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { scaleHeight, scaleWidth } from "../utils/size";
import Colors from "../utils/colors";
import ButtonPrimary from "./ButtonPrimary";

export default function CamionSkeleton() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-scaleWidth(200), scaleWidth(200)],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.1, 0.3, 0.1],
  });

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => console.log("first")}
        style={[styles.doctorItem]}
      >
        <View style={styles.skeletonImg} />
        <View style={styles.rateView}>
          <View style={styles.skeletonName} />
        </View>
        <View style={styles.skeletonSpecialized} />
        <View style={styles.locationView}>
          <View style={styles.skeletonLocation} />
        </View>
        <View style={styles.btnView}>
          <ButtonPrimary
            style={styles.btnCall}
            titleStyle={styles.txtBtnCall}
            title={''}
            onPress={() => console.log("ir")}
            // disabled={isLoading}
          />
          <ButtonPrimary
            style={styles.btnMessage}
            titleStyle={styles.txtBtnMessage}
            title={""}
            onPress={() => console.log("ir")}
            // disabled={isLoading}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scaleWidth(16),
    backgroundColor: Colors.pageBackGround,
    borderRadius: scaleWidth(8),
  },
  skeletonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skeletonImage: {
    width: scaleWidth(56),
    height: scaleWidth(56),
    borderRadius: scaleWidth(26),
    backgroundColor: Colors.silverChalice,
  },
  skeletonText: {
    width: scaleWidth(100),
    height: scaleHeight(16),
    borderRadius: scaleWidth(2),
    backgroundColor: Colors.silverChalice,
    marginBottom: scaleHeight(4),
  },
  skeletonLocation: {
    width: scaleWidth(150),
    height: scaleHeight(16),
    borderRadius: scaleWidth(2),
    backgroundColor: Colors.silverChalice,
    marginBottom: scaleHeight(4),
  },
  skeletonButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scaleWidth(200),
  },
  skeletonButton: {
    width: scaleWidth(96),
    height: scaleHeight(32),
    borderRadius: scaleWidth(6),
    backgroundColor: Colors.silverChalice,
  },
});
