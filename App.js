import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '7c02ea7b1c7af6db0f5ca2554acbe752'; 

  const getWeatherData = async () => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Erro ao obter a previsão do tempo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        onChangeText={text => setCity(text)}
        value={city}
      />
      <Button title="Obter Previsão" onPress={getWeatherData} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Cidade: {weatherData.name}</Text>
          <Text style={styles.weatherText}>Temperatura: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherText}>Clima: {weatherData.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default App;
