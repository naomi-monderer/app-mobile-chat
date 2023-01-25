import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';

const LongPressMessage = () => {
    const [message, setMessage] = useState('Press and hold to change the message');
    const [modalVisible, setModalVisible] = useState(false);

    const handleLongPress = () => {
        setModalVisible(true);
    };

    const handleReaction = (reaction) => {
        setMessage(`${message} ${reaction}`);
        setModalVisible(false);
    };

    const styles = {
        modalContainer: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        reactionsContainer: {
          position: 'absolute',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        },
    };

    return (
        <View>
            <TouchableOpacity onLongPress={handleLongPress}>
                {
                /// component Message du dossier screen  
                }
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <View>
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
    );
};

export default LongPressMessage;