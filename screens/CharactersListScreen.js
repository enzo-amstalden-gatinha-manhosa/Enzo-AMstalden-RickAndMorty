import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const estilização = {
    bg: '#0b0f17',           
    card: '#0f1724',         
    neon: '#37ff8a',        
    roxo: '#7b61ff',           
};

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
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>{`${item.status} • ${item.species}`}</Text>
                <Text style={styles.locationText}>{item.location?.name}</Text>
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
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: estilização.bg,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: estilização.text,
        textShadowColor: estilização.neon,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    listContent: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    separator: {
        height: 12,
    },
    card: {
        width: '90%',
        flexDirection: 'row',
        padding: 12,
        backgroundColor: estilização.card,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: estilização.neon,
    },
    image: {
        width: 68,
        height: 68,
        borderRadius: 10,
        marginRight: 12,
        borderWidth: 1.5,
        borderColor: estilização.roxo,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: estilização.neon,
        marginBottom: 4,
    },
    subText: {
        color: estilização.roxo,
        fontSize: 13,
    },
    locationText: {
        marginTop: 6,
        color: estilização.roxo,
        fontSize: 12,
    },
});