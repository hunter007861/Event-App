import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRScreen from './src/screens/QRScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({route})=>({
        headerShown:false,
        tabBarActiveTintColor:"#000",
        tabBarIcon:({color,size,focused})=>{
          let iconName;

          if(route.name === "Home"){
            iconName = focused ? "home" : 'home-outline'
          }else{
            iconName = focused ? "qr-code" : "qr-code-outline"
          }
           return <Icon name={iconName} size={22} color={"black"}/>
        }
        })}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="QR Screen" component={QRScreen} />
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
