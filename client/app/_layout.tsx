import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Esto ocultará el encabezado para todas las pantallas
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="graficasyrep" />
      <Stack.Screen name="metricas" />
      <Stack.Screen name="porfile" />
      <Stack.Screen name="detallesAct" />
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
    </Stack>
  );
}