import * as React from 'react';
import  {useState, useEffect, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// import LongPressMessage from '../components/LongPressMessage';
// import { GiftedChat, Bubble, Time} from 'react-native-gifted-chat';

const Messages = () => {
    const [message, setMessage] = useState('Press and hold to change the message');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);

    const handleLongPress = () => {
        setModalVisible(true);
    };

    const handleReaction = (reaction) => {
        setMessage(`${message} ${reaction}`);
        setSelectedReaction(reaction);
        setModalVisible(false);
    };

    const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',  hour12: true }));

    
    return (
        
        <View style={styles.container}>

    {
       // MESSAGE REÇU
    }
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
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    style={styles.modalContainer}
                >
                    <View style={[styles.reactionsContainer]}>
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
            <View style={styles.bottomModal}> 
                {selectedReaction && (
                    <View>
                        <Text style={{marginLeft:35}}>{selectedReaction}</Text>
                    </View>
                )}
                <Text style={styles.sendedHour}>
                    {
                    //inclure date d'envoi
                    }
                        {dateTime}
                </Text>
            </View>
    {
       // heure du milieu
    }
            <Text style={styles.currentHour}>
                    {dateTime}
            </Text>
    {
       // MESSAGE ENVOYÉ
    }
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



const styles = StyleSheet.create({

    emoji: {
        
    },
   
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

    bottomModal:{
        flexDirection:'row',
        width:'40%',
        justifyContent:'space-between'
        
    },

    currentHour:{
        alignSelf: 'center',
        padding:10,
        fontSize:12
    },

    modalContainer: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    reactionsContainer: {
        // marginTop:100,
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    
});