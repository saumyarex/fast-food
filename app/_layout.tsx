import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://7e3871f5042f9fd3344cff907fed46b8@o4510257220485120.ingest.us.sentry.io/4510257224155136',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{ headerShown: false }} />;
});