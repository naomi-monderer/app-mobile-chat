import React from 'react';
import {TextInput, TouchableOpacity, StyleSheet, View} from 'react-native';
import axios from 'axios';
import { API } from '../constant/constant';


axios.post(`${API}/message/`, {

    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    // },          
    content: content,
})
.then(response => {
    console.log('response', response);
})
.catch(error => {
    if(error.response.data){
        alert(error.response.data.error);
    }
    console.log('error', error.response.data);
}); 


export default function InputText(props) {

    // const [height, setHeight] = useState(0);
    
    return (

            
                <View style={styles.container}>
                    <TextInput style={styles.input} 
                                placeholder={props.placeholder} 
                                value={props.value} 
                                onChangeText={props.onChangeText}
                                // onChangeHeight = {props}

                    />
                </View>
    
    )
} 


const styles = StyleSheet.create({

    container: {

        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
        height: '25%',
        borderBottomWidth: 1,
        borderBottomColor: '#ADADAD'
    },

    input: {

        backgroundColor: '#ADADAD',
        height: '60%',
        margin: 8,
        marginBottom:14,
        borderRadius:30
    }
})




// class AutoExpandingTextInput extends React.Component {
//     state: any;
  
//     constructor(props) {
//       super(props);
//       this.state = {text: '', height: 0};
//     }
//     render() {
//       return (
//         <TextInput
//           {...this.props}
//           multiline={true}
//           onChange={(event) => {
//             this.setState({
//               text: event.nativeEvent.text,
//               height: event.nativeEvent.contentSize.height,
//             });
//           }}
//           style={[styles.default, {height: Math.max(35, this.state.height)}]}
//           value={this.state.text}
//         />
//       );
//     }
//   }