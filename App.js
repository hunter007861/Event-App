import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRScreen from './src/screens/QRScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { useEffect, useRef, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const prefix = Linking.createURL('/')

export default function App() {

  const Tab = createBottomTabNavigator();
  const linking = {
    prefixes : [prefix],
    config:{
      screens:{
        Home:{
          path:"Home"
        },
        QRScreen:{
          path:"QRScreen"
        }
      }
    }
  }
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer linking={linking}>
        <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#000",
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : 'home-outline'
            } else {
              iconName = focused ? "qr-code" : "qr-code-outline"
            }
            return <Icon name={iconName} size={22} color={"black"} />
          }
        })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="QRScreen" component={QRScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
   
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}