import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Livro } from '../Database/model/Livro';
import { LivroService } from '../Database/database/livroService';
import styles from './styles';

export default function Listar({ navigation }: any) {
  const [livros, setLivros] = useState<Livro[]>([]);

  async function carregarLivros() {
    try {
      const dados = await LivroService.findAll();
      setLivros(dados);
    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível carregar os livros.');
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarLivros();
    });
    return unsubscribe;
  }, [navigation]);

  async function excluirLivro(livro: Livro) {
    Alert.alert(
      'Excluir Livro',
      `Deseja realmente excluir "${livro.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await LivroService.delete(livro);
            carregarLivros();
          },
        },
      ]
    );
  }

  async function editarLivro(livro: Livro){
    navigation.navigate('Resenha', { livro });
  }



  const renderItem = ({ item }: { item: Livro }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.listItemText}>{item.titulo}</Text>
        <Text style={styles.listItemSubText}>
          {item.autor} • {item.genero} • {item.ano}
        </Text>
        <Text style={[styles.listItemSubText, { marginTop: 4 }]}>
          Status: {item.status}
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonDanger} onPress={() => excluirLivro(item)}>
        <Text style={styles.buttonDangerText}>Excluir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDanger} onPress={() => editarLivro(item)}>
        <Text style={styles.buttonDangerText}>Resenha</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Livros</Text>

      {livros.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum livro cadastrado ainda.</Text>
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
