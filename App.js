import React, {Fragment, useEffect, useState} from 'react';
import { AsyncStorage,SafeAreaView, StatusBar } from 'react-native';
import Parse from 'parse/react-native';
import LoginView from './components/LoginView'
import TasksView from './components/TasksView'

const App = () => {
  const [user, setUser] = useState()

  useEffect(()=> {
    Parse.setAsyncStorage(AsyncStorage)
    Parse.initialize('launchpeertodo','','lerxuhfysldkjfaygnbkelxjfl');
    Parse.serverURL = 'http://localhost:1337/parse';
  },[])

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex:1, backgroundColor: '#012823'}}>
        {user ? <TasksView/> : <LoginView userState={[user,setUser]}/>}
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
