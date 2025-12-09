import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const estilização = {
    bg: '#0b0f17',                    
    neon: '#37ff8a',         
    roxo: '#7b61ff',                
};

export default function CharacterDetailScreen({ route }) {
    const { characterId, detailUrl } = route.params || {};
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const buildUrl = () => {
        if (detailUrl && typeof detailUrl === 'string' && detailUrl.startsWith('http')) {
            return detailUrl;
        }
        if (characterId) {
            return `https://rickandmortyapi.com/api/character/${characterId}`;
        }
        return null;
    };

    useEffect(() => {
        const url = buildUrl();
        if (!url) {
            setError('Nenhum id ou URL fornecido.');
            setLoading(false);
            return;
        }

        let mounted = true;
        const fetchDetail = async () => {
            try {
                const res = await axios.get(url);
                if (mounted) setCharacter(res.data);
            } catch (err) {
                if (mounted) setError('Erro ao carregar detalhes.');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchDetail();
        return () => {
            mounted = false;
        };
    }, [characterId, detailUrl]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00b5cc" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!character) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Personagem não encontrado.</Text>
            </View>
        );
    }

    const created = character.created ? new Date(character.created).toLocaleString() : character.created;

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{character.status}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Espécie:</Text>
                <Text style={styles.value}>{character.species}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Gênero:</Text>
                <Text style={styles.value}>{character.gender}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Origem:</Text>
                <Text style={styles.value}>{character.origin?.name || '—'}</Text>
            </View>


            <View style={styles.row}>
                <Text style={styles.label}>Localização atual:</Text>
                <Text style={styles.value}>{character.location?.name || '—'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações extras:</Text>
                <Text style={styles.section}>Id: {character.id}</Text>
                <Text style={styles.section}>Criado: {character.created}</Text>
                <Text style={styles.section}>URL: {character.url}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: estilização.bg,
    },
    container: {
        backgroundColor: estilização.bg,
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 14,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 12,
    },
    name: {
        marginTop: 6,
        fontSize: 24,
        fontWeight: '800',
        color: estilização.roxo,
        textAlign: 'center',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: estilização.neon,
        marginTop: 8,
    },
    label: {
        color: estilização.neon,
        fontWeight: '700',
    },
    value: {
        color: estilização.roxo,
        maxWidth: '60%',
        textAlign: 'right',
    },
    section: {
        color: estilização.roxo,
    },
    sectionTitle: {
        color: estilização.neon,
        fontSize: 18,
        fontWeight: '700',
    },
    errorText: {
        color: '#ff6b6b',
    },
});