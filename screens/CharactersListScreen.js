import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function CharactersListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      setCharacters(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
};

useEffect(() => {
    fetchCharacters();
}, []);

const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
    >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subText}>{`${item.status} • ${item.species}`}</Text>
        </View>
    </TouchableOpacity>
);

if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00b5cc" />
        </View>
    );
}

return (
    <View style={styles.container}>
        <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcffe9ff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subText: {
        marginTop: 4,
        color: '#666',
    },
});