import * as React from 'react';
import  {useState, useEffect, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// import { GiftedChat, Bubble, Time} from 'react-native-gifted-chat';

const Messages = () => {
    const [message, setMessage] = useState('Press and hold to change the message');
    const [modalVisible, setModalVisible] = useState(false);

    const handleLongPress = () => {
        setModalVisible(true);
    };

    const handleReaction = (reaction) => {
        setMessage(`${message} ${reaction}`);
        setModalVisible(false);
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
        
        <View style={styles.container}>
             <View style={styles.receivedMessage}>
                <TouchableOpacity onLongPress={handleLongPress}>
                    <Text style={{margin:15}}>
                    {
                    //inclure data ici
                    }
                        gfrbehqbkhbfc,lkrf,rjferjfnzefnksdjnfsjknfksjncjsndcsndcjsdncsnduhufhouhouf
                    </Text>
                </TouchableOpacity>
                <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                style={styles.modalContainer}
            >
                <View style={styles.sendedHour}>
                    <TouchableOpacity
                        onPress={() => handleReaction('😃')}
                    >
                        <Text>😃</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleReaction('😢')}
                    >
                        <Text>😢</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleReaction('🤔')}
                    >
                        <Text>🤔</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
                <TouchableOpacity onLongPress={handleLongPress}> 
                    <Text style={{margin:15}}>
                        blic bloc hfzieudhuidhu
                    </Text>
                </TouchableOpacity>
            </View>
                <Text style={styles.receivedHour}>
                    {dateTime}
                </Text>
        </View>
    );


}

export default Messages;



