import React, {Component} from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import ButtonMessage from './ButtonMessage';

export default function InputText(props) {

    // const [container, setContainer] = useStat(false)

    // const [height, setHeight] = useState(0);

    return (
            
            <KeyboardAvoidingView style={styles.container1} behavior='padding'>
                <ScrollView>
                    <View style={styles.view} >
                        <TextInput style={styles.input} 


                        />
                        <ButtonMessage/>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

 
        // <View style={styles.container} >
        //     <TextInput style={styles.input}
        //         placeholder={props.placeholder}
        //         value={props.value}
        //         onChangeText={props.onChangeText}
        //     // onChangeHeight = {props}
        //     />
        // </View>



    )
}


const styles = StyleSheet.create({
    container1:{
    
        backgroundColor:'blue',
        // position:'absolute',
        // bottom:0,
        display:'flex',
        width:'100%',
        //  height: 200,


    },

    container: {
        // display: 'flex',
        // flex:1,
        // // justifyContent: 'center',
        // backgroundColor: 'black',
        // bottom: 0,
        // position: 'absolute',
        // height: '25%',
        // borderBottomWidth: 1,
        // borderBottomColor: '#ADADAD',
        // // position:'absolute'
      
            // flex:1,
            // display: 'flex',
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'center',
         
    },
    view:{

        backgroundColor: 'red',
        height: 70,

        // width: '100%',
        // bottom: 0,
        // position: 'absolute',

    }, 

    input: {

        backgroundColor: '#ADADAD',
        height: 50,
        width: '100%',
        // margin: 8,
        // marginBottom: 14,
        borderRadius: 30,
        // display:'flex',
        // position: 'absolute',
        // bottom:0

    }
})




// <View
// style={{
//     backgroundColor: 'red',
//     height: 70,
//     // width: '100%',
//     // bottom: 0,
//     // position: 'absolute',
//     // display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
// }}
// >
// <ButtonMessage idRoom={props.idRoom} />
// <TextInput
//     style={{
//         backgroundColor: 'white',
//         width: '95%',
//         height: '60%',
//         borderRadius: 30,
//         // flex: 1,


//     }}

// // placeholder={props.placeholder}
// // value={props.value}
// // onChangeText={props.onChangeText}
// // onChangeHeight = {props}
// />
// </View>