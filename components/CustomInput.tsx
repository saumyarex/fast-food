import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { CustomInputProps } from "@/type";
import cn from "clsx";

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  keyboardType = "default",
  secureTextEntry = false,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      <Text className="label"> {label} </Text>
      <TextInput
        value={value}
        keyboardType={keyboardType}
        onChange={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "input",
          isFocused ? "border-primary" : "border-gray-300"
        )}
      />
    </View>
  );
};

export default CustomInput;
