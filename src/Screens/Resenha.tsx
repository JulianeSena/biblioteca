import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Livro } from '../Database/model/Livro';
import { LivroService } from '../Database/database/livroService';

interface Props {
  route: any; 
  navigation: any;
}

export default function Resenha({ route, navigation }: Props) {
  // Garantindo que "livro" exista
  const livro: Livro | undefined = route.params?.livro;

  const [resenha, setResenha] = useState<string>(livro?.resenha || '');

  useEffect(() => {
    if (!livro) {
      Alert.alert('Erro', 'Livro não encontrado.');
      navigation.goBack();
    }
  }, [livro]);

  const salvarResenha = async () => {
    if (!livro) return;

    try {
      livro.resenha = resenha;
      await LivroService.update(livro);
      Alert.alert('Sucesso', 'Resenha salva!');
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível salvar a resenha.');
    }
  };

  if (!livro) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Livro não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resenha de: {livro.titulo}</Text>

      <TextInput
        style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
        placeholder="Escreva sua resenha aqui..."
        multiline
        value={resenha}
        onChangeText={setResenha}
      />

      <TouchableOpacity style={styles.button} onPress={salvarResenha}>
        <Text style={styles.buttonText}>Salvar Resenha</Text>
      </TouchableOpacity>
    </View>
  );
}
