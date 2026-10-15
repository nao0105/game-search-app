import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getGameDetail } from '../api/rawg';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await getGameDetail(id);
        setGame(data);
      } catch (error) {
        console.error('Failed to fetch game detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!game) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>ゲーム情報を取得できませんでした。</Text>
      </View>
    );
  }

  const platformNames = game.platforms?.map((item) => item.platform?.name).filter(Boolean).join(', ') || '不明';

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: game.background_image || FALLBACK_IMAGE }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{game.name}</Text>
        <Text style={styles.meta}>発売日: {game.released || '未定'}</Text>
        <Text style={styles.meta}>評価: {game.rating ?? '未評価'}</Text>
        <Text style={styles.meta}>プラットフォーム: {platformNames}</Text>
        <Text style={styles.description}>{game.description_raw || game.description || '説明はありません。'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  description: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
});
