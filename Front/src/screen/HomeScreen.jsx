import {View, Text, Button} from 'react-native';

export default function HomeScreen ({navigation}){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
        <Button title = 'Chat' onPress = {()=> navigation.navigate('ChatScreen' , {id_room: 4})} /> 
      </View>
    )
}