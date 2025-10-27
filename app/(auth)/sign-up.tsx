import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { createAccount } from "@/lib/appwrite";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;

    if (!email || !password || !name) {
      return Alert.alert(
        "Error",
        "Please provide valid name, email and password"
      );
    }

    setIsSubmitting(true);

    try {
      await createAccount({ name, email, password });

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Full Name"
        value={form.name}
        placeholder="Enter your name"
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
      />
      <CustomInput
        label="Email"
        value={form.email}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
      />
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />

      <View className="flex justify-center mt-0 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href={"/sign-in"} className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
