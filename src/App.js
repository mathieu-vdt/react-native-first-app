import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './vues/login';
import Inscription from './vues/inscription';
import { PhotoContext } from './context/photoContext';
import MesAlbums from './vues/mesAlbums';
import AjoutAlbums from './vues/ajoutAlbum';
import { blue, pink, white, yellow } from './components/colors'

import ProjectList from './vues/projects/list';
import ProjectDetails from './vues/projects/details';

const Stack = createStackNavigator();
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
    name: 'project_list',
    component: ProjectList,
    label: 'Projets',
    icon: 'album',
  },
  {
    name: 'project_details',
    component: ProjectDetails,
    label: 'Details',
    icon: 'album',
  }
]


const NoConn = 
  <Tab.Navigator 
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
  </Tab.Navigator>

const ProjectStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="project_list"
        component={ProjectList}
        options={{ headerShown: false }} // Cachez la barre de navigation en haut si nécessaire
      />
      <Stack.Screen
        name="project_details"
        component={ProjectDetails}
        options={{ tabBarVisible: false }} // Cacher l'onglet "project_details" dans la barre de navigation inférieure
      />
    </Stack.Navigator>
  );
};

const Conn = (
  <Tab.Navigator 
    initialRouteName="projet_list"
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
        component={screen.name === 'project_list' ? ProjectStack : screen.component}
        options={{
          tabBarLabel: screen.label,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={screen.icon} color={color} size={22} />
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);

