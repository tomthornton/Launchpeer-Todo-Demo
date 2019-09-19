import React from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
import Modal from 'react-native-modal'
import RemoveIcon from '../assets/images/remove-icon.png'

export default function TaskModal({modalState, action}) {
    const {modalVisible, toggleModal, modalText, setModalText} = modalState;

    return (
        <Modal isVisible={modalVisible} animationInTiming={200} animationOutTiming={200} useNativeDriver={true}>
            <View style={styles.modalContainer} >
              <View style={styles.modalTitleContainer}>
                <Text style={{fontSize: 20}}>Add New Task</Text>
                <TouchableOpacity onPress={()=> toggleModal(false)}>
                  <Image source={RemoveIcon} style={{height: 15, width: 15}}/>
                </TouchableOpacity>
              </View>
              <View style={{padding: 15}}>
                <View style={styles.inputContainer}>
                  <TextInput placeholder='Task' value={modalText} onChangeText={text=> setModalText(text)}/>
                </View>
                <View style={{marginTop: 15, flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={()=> toggleModal(false)}
                    style={[styles.buttonContainer, {backgroundColor: 'red', marginRight: 30}]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=> action()}
                    style={[styles.buttonContainer, {backgroundColor: 'blue'}]}>
                        <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>)
}

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 5,
    },
    modalTitleContainer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 0.5
    },
    inputContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 4
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        padding: 10,
        textAlign: 'center',
        width: 80,
        backgroundColor: 'red',
        borderRadius: 4
    }
  });