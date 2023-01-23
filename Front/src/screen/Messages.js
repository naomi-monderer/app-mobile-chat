import * as React from 'react';
import axios from 'axios';
import { API } from '../constant/constant';
import  {useState, useEffect, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// import LongPressMessage from '../components/LongPressMessage';
// import { GiftedChat, Bubble, Time} from 'react-native-gifted-chat';






const Messages = () => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [dateTime, setDateTime] = useState();
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [message, setMessages] = useState('Press and hold to change the message');
    
    
    const fetchMessages = async () => {
        const client = axios.create({
            baseURL: "http://localhost:3000/",
        })
        try {
            const response = await client.get('chat/');
            setMessages(response.data);
            console.log("my messsssszages", response.data)
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchMessages();
    }, []);

    const handleLongPress = () => {
        setModalVisible(true);
    };
   
    const handleReaction = (reaction) => {
        setMessages(`${message} ${reaction}`);
        setSelectedReaction(reaction);
        setModalVisible(false);
        // setDateTime(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
    };

    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });


    const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',  hour12: true }));

    
    return (
        <>
        <View style={styles.container}>

    {
       // MESSAGE REÇU
    }
             <View  style={styles.receivedMessage}>
             
                    <TouchableOpacity onLongPress={handleLongPress} onLayout={event => {
                            const { x, y, width, height } = event.nativeEvent.layout;
                            setModalPosition({ bottom: y + height, right: x });
                    }}>
                        <Text style={{margin:15}}>
                        {
                        //inclure data ici
                        }
                            gfrbehqbkhbfc,lkrf,rjferjfnzefn fbqzehbfiu
                        </Text>
                    </TouchableOpacity> 
             </View>
             <TouchableOpacity>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    style={[styles.modalContainer, ]}
                >
                    <View style={[styles.modalContainer]}>
                        <TouchableOpacity
                            onPress={() => handleReaction('💅🏽')}
                        >
                            <Text>💅🏽</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleReaction('🫶')}
                        >
                            <Text>🫶</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleReaction('🤮')}
                        >
                            <Text>🤮</Text>
                        </TouchableOpacity>
                    </View>
                </Modal> 
                </TouchableOpacity>
                 
            
            <View style={styles.bottomModal}> 
                <Text style={styles.sendedHour}>
                    {
                    //inclure date d'envoi
                    }
                        {dateTime}
                </Text>
                 {/* permet l'affichage de la reaction sous le message */}
                {selectedReaction ? (
                        <View >
                            <Text style={{ marginLeft: 35 }}>{selectedReaction}</Text>
                        </View>
                ) : null}
            </View>
    {
       // heure du milieu
       
    }
            <View>
                <Text style={styles.currentHour}>
                        {dateTime}
                </Text>
            </View>
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
        </>
    );
    
    
}

export default Messages;



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
        position: 'relative',
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
        width:'45%',
        flexWrap:'nowrap',
        justifyContent:'space-between',
      
    },

    currentHour:{
        alignSelf: 'center',
        padding:10,
        fontSize:12
    },

    modalContainer: {
        position: 'absolute',
        // right: 120,
        // bottom: 370,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
       
        // // position: 'absolute',
   
        flexDirection: 'row',
        // justifyContent:'space-between',
        // alignItems: 'center',
        // width: '20%',
        // height: '100%',
        // backgroundColor: '#black',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    reactionsContainer: {
        // position:'absolute',
        // marginTop:150,
        marginRight: 10,
        width:'20%',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
       

        // paddingLeft: 80,
        // marginVertical: 5,
        // marginHorizontal: 10,
        // backgroundColor: '#00000',
        borderRadius: 20,
        
    },

    
});