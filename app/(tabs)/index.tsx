import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven: any = index % 2;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row" : "flex-row-reverse"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode={"contain"}
                      />
                    </View>

                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pr-10" : "pl-10"
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {" "}
                        {item.title}{" "}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        tintColor={"#ffffff"}
                        resizeMode="contain"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full mt-2 ">
            <View className="flex-start">
              <Text className="small-bold text-primary">Delivery To</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Raipur</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
