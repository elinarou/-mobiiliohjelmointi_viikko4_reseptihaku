import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRecipes(data.meals))
    .catch(error => Alert('Error', error));
  };

  const ItemSeparator = () => 
    <View
      style={{
        height: 1,
        width: "100%",
        margin: 10,
        backgroundColor: "grey"
        }} 
    />

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.idMeal}
        data={recipes}
        renderItem={({item}) => 
          <View>
            <Text>{item.strMeal}</Text>
            <Image 
              style={{ width: 100, height: 100 }}
              source={{ uri: `${item.strMealThumb}` }}
            />
          </View>}
          ItemSeparatorComponent={ItemSeparator}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredient" 
        onChangeText={text => setKeyword(text)} 
        value={keyword}
      />
      <Button 
        onPress={getRecipes} 
        title="Find"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input : {
      width:200  , 
      borderColor: 'gray', 
      borderWidth: 1,
      padding: 5,
      margin: 10
    }
});
