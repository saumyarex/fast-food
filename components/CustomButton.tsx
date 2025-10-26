import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  onPress,
  title = "Click me",
  style,
  textStyle,
  isLoading = false,
  leftIcon,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn("custom-btn", style)} onPress={onPress}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text className={cn("text-white-100 paragrah-semibold", textStyle)}>
            {" "}
            {title}{" "}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
