import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import api from '../../services/api';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {

  const navigation = useNavigation();
  const [uf, setUf] = useState<string[]>([]);
  const [city, setCity] = useState<string[]>([]); 

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    api.get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUf(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    api.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCity(cityNames);
      });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf, 
      city: selectedCity 
    }
    );
  }

  function NavigateToPoints() {
    navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
  }

  function handleSelectUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectCity(city: string) {
    setSelectedCity(city);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
          </View>
        </View>

        <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{ label: 'Selecione um estado' }}
          Icon={() => <Icon name="chevron-down" size={20} color="#34CB79" />}
          style={{
            placeholder: {
              fontFamily: 'Roboto_400Regular',
              alignItems: 'center',
              fontSize: 16,
              color: '#6C6C80',
            },
            viewContainer: {
              height: 60,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginBottom: 8,
              paddingHorizontal: 24,
              paddingTop: 5,
            },
            iconContainer: {
              padding: 20,
            },
          }}
          onValueChange={(value) => handleSelectUf(value)}
          items={uf.map((uf) => ({ label: uf, value: uf }))}
        />

        <RNPickerSelect
          placeholder={{ label: 'Selecione uma cidade' }}
          Icon={() => <Icon name="chevron-down" size={20} color="#34CB79" />}
          style={{
            placeholder: {
              fontFamily: 'Roboto_400Regular',
              alignItems: 'center',
              fontSize: 16,
              color: '#6C6C80',
            },
            viewContainer: {
              height: 60,
              backgroundColor: '#FFF',
              borderRadius: 10,
              marginBottom: 8,
              paddingHorizontal: 24,
              paddingTop: 5,
            },
            iconContainer: {
              padding: 20,
            },
          }}
          onValueChange={(value) => handleSelectCity(value)}
          items={city.map((city) => ({ label: city, value: city }))}
        />

        <RectButton style={styles.button} onPress={NavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" size={24} color="#FFF" />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#34CB79',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;