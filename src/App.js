import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import Login from './vues/login';
import Inscription from './vues/inscription';
import { PhotoContext } from './context/photoContext';
import MesAlbums from './vues/mesAlbums';
import AjoutAlbums from './vues/ajoutAlbum';
import { blue, pink, white, yellow } from './components/colors'

import ProjectList from './vues/projects/list';
import ProjectDetails from './vues/projects/details';

const Tab = createMaterialBottomTabNavigator()
export default function App() {
  const [user, setUser] = useState({})
  const [resfresh, setRefresh] = useState(false)


  if (user && user.email) console.log(user.email)
  return (
    <PhotoContext.Provider value={{ user, setUser, resfresh, setRefresh }}>
      <NavigationContainer>
        {(user && user.email) ? Conn : NoConn}
      </NavigationContainer>
    </PhotoContext.Provider>
  );
}

const screenNoConn = [
  {
    name: 'Login',
    component: Login,
    label: 'Connexion',
    icon: 'account',
  },
  {
    name: 'Inscription',
    component: Inscription,
    label: 'Inscription',
    icon: 'account-plus',
  },
];

const screenConn = [
  {
    name: 'Mes_albums',
    component: MesAlbums,
    label: 'Mes Albums',
    icon: 'album',
  },
  {
    name: 'Ajout_Album',
    component: AjoutAlbums,
    label: 'Ajouter Album',
    icon: 'plus-box',
  },
]

const NoConn = <Tab.Navigator 
                initialRouteName="Login"
                activeColor={pink}
                inactiveColor={white}
                barStyle={
                  { 
                    backgroundColor: blue,
                  }
                  }>
                {screenNoConn.map((screen) => (
                  <Tab.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                      tabBarLabel: screen.label,
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name={screen.icon} color={color} size={26} />
                      ),
                    }}
                  />
                ))}
                <Tab.Screen name="ProjectList" component={ProjectList} />
                <Tab.Screen name="ProjectDetails" component={ProjectDetails} />
              </Tab.Navigator>

const Conn = <Tab.Navigator 
  initialRouteName="Mes_albums"
  activeColor={pink}
  inactiveColor={white}
  barStyle={
    { 
      backgroundColor: blue,
    }
  }>
  {screenConn.map((screen) => (
    <Tab.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={{
        tabBarLabel: screen.label,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name={screen.icon} color={color} size={26} />
        ),
      }}
    />
  ))}
</Tab.Navigator>


