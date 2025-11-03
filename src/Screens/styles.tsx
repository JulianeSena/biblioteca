import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    padding: 16,
  },

  // Títulos
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffaad5ff',
    marginBottom: 16,
  },

  // Texto padrão
  text: {
    fontSize: 16,
    color: '#333',
  },

  // Texto secundário / subtítulo
  textSecondary: {
    fontSize: 14,
    color: '#c486a9',
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: '#ffc0cb',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffe4f0', 
  },

  // Botões
  button: {
    backgroundColor: '#ffaad5ff', 
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Botões de exclusão ou ação negativa
  buttonDanger: {
    backgroundColor: '#ff1493', 
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },

  buttonDangerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // FlatList item
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ffc0cb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffe4f0',
    marginVertical: 4,
  },

  listItemText: {
    fontSize: 16,
    color: '#c71585',
  },

  listItemSubText: {
    fontSize: 14,
    color: '#c486a9',
  },

  // Placeholder para tela vazia
  emptyText: {
    fontSize: 16,
    color: '#c486a9',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
