import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchRecipes = () => {
    setIsAnimating(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => {
      setRecipes(data.meals)
      setIsAnimating(false);
    })
    .catch(err => {
      console.error(err);
      setIsAnimating(false);
    })
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={isAnimating} />
      <FlatList
        data={recipes}
        renderItem={({item}) => 
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
            <Image style={{ width: 100, height: 100 }}
            source={{ uri: item.strMealThumb }}
            />
          </View>
        }
      />
      <TextInput
        value={keyword}
        onChangeText={text => setKeyword(text)}
        placeholder="Keyword"
      />
      <Button title="FIND" onPress={fetchRecipes} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
