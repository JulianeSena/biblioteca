import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/Screens/login';
import { Database } from './src/Database/database/Database';
import Home from './src/Screens/home';
import Adicionar from './src/Screens/Adicionar';
import Listar from './src/Screens/Listar';
import Resenha from './src/Screens/Resenha';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {

  useEffect(() => {
    
    Database.initDb();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff69b4',
        tabBarInactiveTintColor: '#c71585',
        tabBarStyle: { backgroundColor: '#fff0f5' },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'book';
          if (route.name === 'Estante') iconName = 'book';
          else if (route.name === 'Adicionar') iconName = 'add-circle';
          else if (route.name === 'Resenha') iconName = 'document-text';
          else if (route.name === 'Home') iconName = 'home';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Estante" component={Listar} />
      <Tab.Screen name="Adicionar" component={Adicionar} />
      <Tab.Screen name="Resenha" component={Resenha} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  return (
    <NavigationContainer>
      {usuarioLogado ? (
        <MainTabs />
      ) : (
        <Login setUsuarioLogado={setUsuarioLogado} />
      )}
    </NavigationContainer>
  );
}
