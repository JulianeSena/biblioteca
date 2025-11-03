import React, { useState } from 'react';
import {Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LivroService } from '../Database/database/livroService';
import { Livro } from '../Database/model/Livro';
import styles from './styles';

export default function Adicionar({ navigation }: any) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [status, setStatus] = useState('');

  async function salvarLivro() {
    if (!titulo || !autor || !genero || !ano || !status) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de salvar.');
      return;
    }

    try {
      const novoLivro = new Livro({
        titulo,
        autor,
        genero,
        ano: Number(ano),
        status,
      });

      await LivroService.create(novoLivro);
      Alert.alert('Livro adicionado com sucesso!');
      limparCampos();
      navigation.navigate('Listar Livros');
    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível adicionar o livro.');
    }
  }

  function limparCampos() {
    setTitulo('');
    setAutor('');
    setGenero('');
    setAno('');
    setStatus('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Livro</Text>

      <TextInput
        placeholder="Título"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        placeholder="Autor"
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
      />

      <TextInput
        placeholder="Gênero"
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
      />

      <TextInput
        placeholder="Ano de Publicação"
        style={styles.input}
        keyboardType="numeric"
        value={ano}
        onChangeText={setAno}
      />

      <TextInput
        placeholder="Status (Lido, Lendo, Quero ler...)"
        style={styles.input}
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={styles.button} onPress={salvarLivro}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
