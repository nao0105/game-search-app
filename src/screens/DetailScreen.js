import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import debounce from 'lodash.debounce';
import useSearchGames from '../hooks/useSearchGames';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';

export default function SearchScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchText(value);
      }, 400),
    []
  );

  const onChangeText = useCallback(
    (value) => {
      setInputText(value);
      debouncedSetSearch(value);
    },
    [debouncedSetSearch]
  );

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useSearchGames(searchText);
  const games = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ゲームを検索</Text>

      <TextInput
        value={inputText}
        onChangeText={onChangeText}
        placeholder="ゲーム名を入力"
        placeholderTextColor="#888"
        style={styles.input}
      />

      {isLoading && <ActivityIndicator size="large" color="#5b7cff" />}

      <FlatList
        data={games}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          >
            <Image
              source={{ uri: item.background_image || FALLBACK_IMAGE }}
              style={styles.image}
            />
            <View style={styles.textWrap}>
              <Text style={styles.gameName}>{item.name}</Text>
              <Text style={styles.meta}>{item.released || '発売日未定'}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" color="#5b7cff" /> : null
        }
        ListEmptyComponent={
          !isLoading && !isFetching && searchText ? (
            <Text style={styles.emptyText}>検索結果がありません</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: 120,
    height: 90,
    resizeMode: 'cover',
  },
  textWrap: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  gameName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  meta: {
    marginTop: 6,
    fontSize: 13,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
    fontSize: 15,
  },
});
