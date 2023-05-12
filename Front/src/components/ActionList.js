import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API } from '../constant/constant';
import jwt_decode from "jwt-decode";
// import { getUserInfos, logOut} from "../api/auth";

const ActionList = ({ actions }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={actions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={item.handleModifyProfile} style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
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