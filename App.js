import { NavigationContainer } from '@react-navigation/native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import Home from './screens/Home';
import Videos from './screens/Videos';
import Favourites from './screens/Favourites';
import { Ionicons } from '@expo/vector-icons';
import { Image, SafeAreaView, View } from 'react-native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#f4f4f4',
                borderBottomWidth: 1,
                // backgroundColor: '#3c0a6b'
              }}>
                <Image
                  source={require('./assets/images/user_avtar.png')}
                  style={{ height: 130, width: 130, borderRadius: 70 }}
                />

              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }}
        screenOptions={{
          drawerActiveBackgroundColor: '#f0e1ff',
          drawerActiveTintColor: '#3c0a6b',
          headerStyle: { backgroundColor: '#3c0a6b' },
          headerTintColor: 'white'
        }}>
        <Drawer.Screen name="Home" component={Home} options={{
          drawerIcon: () => <Ionicons name='home' size={21} />

        }} />
        <Drawer.Screen name="Video" component={Videos} options={{
          drawerIcon: () => <Ionicons name='camera' size={21} />

        }} />
        <Drawer.Screen name="Favourites" component={Favourites} options={{
          drawerIcon: () => <Ionicons name='heart' size={21} />

        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

