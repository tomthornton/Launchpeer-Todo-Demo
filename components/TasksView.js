import React, {useState, useEffect} from 'react'
import { View, Image, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView} from 'react-native'
import Parse from 'parse/react-native';
import TaskModal from './TaskModal'
import Task from './Task'
import AddIcon from '../assets/images/add-icon.png'
import LaunchpeerLogo from '../assets/images/launchpeer-logo.png'

export default function TasksView() {
    const [tasks, setTasks] = useState([])
    const [modalVisible, toggleModal] = useState(false);
    const [modalText, setModalText] = useState();
    const [isLoading, setLoading] = useState(true);

    const getAllTasks = async () => {
        const taskObject = Parse.Object.extend("Task")
        const allTasksQuery = new Parse.Query(taskObject)
        allTasksQuery.equalTo("createdBy", Parse.User.current)
        const allTasksResponse = await allTasksQuery.find()

        setTasks(allTasksResponse.map(task => ({
          id: task.id,
          createdAt: task.createdAt,
          name: task.get('name'),
          completed: task.get('completed')
        })))
    }

    const addNewTask = () => {
        const TaskObject = Parse.Object.extend("Task")
        const newTask = new TaskObject();
        newTask.set("name", modalText);
        newTask.set("createdBy", Parse.User.current())

        newTask.save().then(()=> {
          getAllTasks()
          toggleModal(false);
          setModalText('')
        })
      }

    const deleteTask = (id) => {
        const taskObject = Parse.Object.extend("Task")
        const taskQuery = new Parse.Query(taskObject).equalTo('objectId', id)
        taskQuery.find().then(task => {
            task[0].destroy().then(getAllTasks);
        })
    }

    useEffect(()=> { getAllTasks(); setLoading(false);} , [])

    return (
        <View style={{flex:1, backgroundColor: '#023B33'}}>
            <View style={styles.titleContainer}>
            <Image source={LaunchpeerLogo} style={{height: 40, width: 216}}/>
                <Text style={styles.title}>To-Do App</Text>
            </View>
            {isLoading ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
            :
            <ScrollView contentContainerStyle={styles.body}>
                {tasks.map(task => <Task deleteTask={deleteTask} key={task.id} data={task}/>)}
            </ScrollView>}
            <TouchableOpacity onPress={()=> toggleModal(true)} style={styles.addButton}>
                <Image source={AddIcon} style={{height: 20, width: 20}}/>
            </TouchableOpacity>
            <TaskModal
                modalState={{modalVisible, toggleModal, modalText, setModalText}}
                action={addNewTask}
            />
        </View>)
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        padding: 15,
        backgroundColor: '#012823',
        borderRadius: 100
    },
    titleContainer: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#012823'
    },
    title: {
      color: 'white',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'uppercase',
      fontSize: 23,
      position: 'relative',
      top: 2
    },
  });