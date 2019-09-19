import React, {useState} from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import Parse from 'parse/react-native';
import LaunchpeerLogo from '../assets/images/launchpeer-logo.png'

export default function LoginView({userState}) {

  const [user, setUser] = userState;

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const signIn = async () => {
    const newUser = await Parse.User.logIn(username,password);
    setUser(newUser);
  }

    return (
      <View style={styles.loginViewContainer}>
          <View>
            <Image source={LaunchpeerLogo} style={{height: 40, width: 297}}/>
            <Text style={styles.title}>To-Do App</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={{color: 'white'}}
                value={username}
                onChangeText={text=> setUsername(text)}
                placeholder='Username'
                placeholderTextColor='rgba(255,255,255,0.5)'
                autoCorrect={false}
                autoCapitalize='none'
                />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={{color: 'white'}}
                value={password}
                onChangeText={text=> setPassword(text)}
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                placeholderTextColor='rgba(255,255,255,0.5)'
                secureTextEntry={true}
                />
            </View>
          </View>
          <TouchableOpacity
            onPress={()=> signIn() }
            style={styles.loginButtonContainer}>
              <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
  loginViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    marginTop: 30,
    borderRadius: 4
  },
  title: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: 23,
    position: 'relative',
    top: 2,
    fontSize: 35
  },
  loginButtonContainer: {
    borderRadius: 4,
    padding: 15,
    width: 100,
    marginTop:30,
    backgroundColor: '#023B33'
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});
