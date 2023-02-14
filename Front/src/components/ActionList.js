import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const ActionList = ({ handleModifyProfile, handleSignOut, handleDeleteAccount }) => {
  const data = [
    { id: '1', title: 'Modify Profile', onPress: handleModifyProfile },
    { id: '2', title: 'Sign Out', onPress: handleSignOut },
    { id: '3', title: 'Delete Account', onPress: handleDeleteAccount },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress} style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = {
  container: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginTop: 50,
  },
  item: {
    height: 40,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
};

export default ActionList;
