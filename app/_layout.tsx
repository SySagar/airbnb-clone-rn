import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Touchable, TouchableOpacity } from 'react-native';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat.ttf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  const router = useRouter();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
        name="(modals)/login"
         options={{ 
          title:'login',
          animation: 'slide_from_bottom',
          headerTitleStyle:{
            fontFamily:'mon',
            fontSize:20,
            fontWeight:'bold'
          },
          presentation: 'modal',
          headerLeft: ()=>(
            <TouchableOpacity
            onPress={()=>router.back()}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          )
         }} />
          <Stack.Screen
           name="listing/[id]" 
          options={{ 
            headerTitle: '',
           }} />
            <Stack.Screen
           name="(modals)/booking" 
          options={{ 
            headerTitle: 'Bookings',
            animation: 'fade',
            presentation: 'transparentModal',
            headerLeft: ()=>(
              <TouchableOpacity
              onPress={()=>router.back()}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            )
           }} />
      </Stack>
    </ThemeProvider>
  );
}
