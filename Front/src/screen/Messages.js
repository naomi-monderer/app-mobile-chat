import * as React from 'react';
import  {useState, useEffect, useCallback} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { GiftedChat, Bubble, Time} from 'react-native-gifted-chat';

const Messages = ({navigation, route}) => {
    console.log("ID_ROOM", route.params?.id_room)
    const onPressButton = () => {
        console.log('You tapped the button!');
    };
    const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',  hour12: true }));

    const styles = StyleSheet.create({
        sendMessage: {
            margin: 20,
            width: '40%',
            marginBottom:0,
            alignSelf: 'flex-end',
            backgroundColor: '#B2FFDF',
            borderRadius: 20,
        },
        
        container: {
            flex: 1,
        },
        
        receivedMessage:{
            width: '40%',
            margin: 20,
            marginBottom:0,
            alignSelf: 'flex-start',
            borderRadius: 20,
            backgroundColor: '#C5AAFF',
        },

        receivedHour:{
            alignSelf: 'flex-end',
            marginRight: 28,
            paddingTop:0,
            fontSize:10
        },
        sendedHour:{
            alignSelf: 'flex-start',
            marginLeft: 28,
            paddingTop:0,
            fontSize:10
        },
        currentHour:{

            alignSelf: 'center',
            paddingTop:0,
            fontSize:12
        }

    });
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.receivedMessage}>
                <Text style={{margin:15}}>
                {
                //inclure data ici
                }
                    gfrbehqbkhbfc,lkrf,rjferjfnzefnksdjnfsjknfksjncjsndcsndcjsdncsnduhufhouhouf
                </Text>
            </View>
            <Text style={styles.sendedHour}>
                {
                //inclure data ici
                }
                    {dateTime}
            </Text>
            <Text style={styles.currentHour}>
                    {dateTime}
            </Text>
            <View style={styles.sendMessage}>  
                <Text style={{margin:15}}>
                    blic bloc hfzieudhuidhu
                </Text>
            </View>
                <Text style={styles.receivedHour}>
                    {dateTime}
                </Text>
        </SafeAreaView>
    );


}

export default Messages;



