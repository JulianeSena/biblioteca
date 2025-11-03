import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { LivroService } from '../Database/database/livroService';
import styles from './styles';
import Adicionar from './Adicionar';
import Listar from './Listar';

export default function Home({ navigation }: any) {
  const [totalLivros, setTotalLivros] = useState(0);
  const [ultimosLivros, setUltimosLivros] = useState<any[]>([]);

  useEffect(() => {
    const carregarDados = async () => {
      const livros = await LivroService.findAll();
      setTotalLivros(livros.length);
      setUltimosLivros(livros.slice(-3).reverse());
    };
    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à sua Biblioteca!</Text>

      <Text style={styles.text}>📚 Total de livros: {totalLivros}</Text>

      <Text style={[styles.title, { marginTop: 20, fontSize: 20 }]}>Últimos livros adicionados:</Text>
      {ultimosLivros.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum livro adicionado ainda.</Text>
      ) : (
        <FlatList
          data={ultimosLivros}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItemText}>{item.titulo} - {item.autor}</Text>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Adicionar')}>
        <Text style={styles.buttonText}>Adicionar Livro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Estante')}>
        <Text style={styles.buttonText}>Ver Estante</Text>
      </TouchableOpacity>
    </View>
  );
}
