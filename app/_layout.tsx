import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth, ClerkProvider } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CLERK_PUBLISABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key:string) {
   try {
    return SecureStore.getItemAsync(key);
   } catch (error) {
    return null;
   }
  },
  async saveToken(key:string, value:string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Failed to cache token', error);
      return;
    }
  }
}

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

  return (

  <ClerkProvider publishableKey={CLERK_PUBLISABLE_KEY!} 
    tokenCache={tokenCache}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  </ClerkProvider>
    )
}

function RootLayoutNav() {

  const router = useRouter();
  const {isLoaded,isSignedIn} = useAuth();

  useEffect(() => {
    if(isLoaded && !isSignedIn){
      router.push('/(modals)/login');
    }
  }, [isLoaded]);

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
            headerTransparent: true,
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
