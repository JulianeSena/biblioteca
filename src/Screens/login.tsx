import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { UsuarioService } from '../Database/database/UsuarioService';

interface Props {
  setUsuarioLogado: (logado: boolean) => void;
}

export default function Login({ setUsuarioLogado }: Props) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);

  useEffect(() => {
    UsuarioService.initDb();
  }, []);

  const handleLogin = async () => {
    if (!nome || !senha) {
      Alert.alert('Erro', 'Preencha nome e senha');
      return;
    }

    if (modoCadastro) {
      try {
        await UsuarioService.create({ nome, senha });
        Alert.alert('Sucesso', 'Usuário cadastrado! Faça login agora.');
        setModoCadastro(false);
        setSenha('');
      } catch (e) {
        Alert.alert('Erro', 'Nome já existe ou problema no cadastro');
      }
    } else {
      const usuario = await UsuarioService.login(nome, senha);
      if (usuario) {
        Alert.alert('Bem-vindo', `Olá, ${usuario.nome}!`);
        setUsuarioLogado(true);
      } else {
        Alert.alert('Erro', 'Nome ou senha incorretos');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{modoCadastro ? 'Cadastro' : 'Login'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{modoCadastro ? 'Cadastrar' : 'Entrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModoCadastro(!modoCadastro)}>
        <Text style={[styles.text, { marginTop: 10, color: '#c71585', textAlign: 'center' }]}>
          {modoCadastro ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
