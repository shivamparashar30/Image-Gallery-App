import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import home from './screens/home';
import Videos from './screens/Videos';
import Favourites from './screens/Favourites';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={home} />
        <Drawer.Screen name="Video" component={Videos} />
        <Drawer.Screen name="Favourites" component={Favourites} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

