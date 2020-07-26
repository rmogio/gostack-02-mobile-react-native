import React, {useState, useEffect}from 'react'

import {SafeAreaView, FlatList, Text, StatusBar, StyleSheet, TouchableOpacity} from 'react-native'

import api from './services/Api'

export default function App(){
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data)
      setProjects(response.data)
    })
  },[])

  async function handleAddProject(){
    const response = await api.post('projects', {
      title:`Projeto ${Date.now()}`,
      owner: 'Ricardo Mogio'
    })
    setProjects([...projects, response.data])
  }

  return (
    <>
      {
        <SafeAreaView style={styles.container}>
          <FlatList 
           data={projects}
           keyExtractor={project => project.id}
           renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
           )}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAddProject} >
            <Text style={styles.buttonText} >Adicionar Novo</Text>
          </TouchableOpacity>
        </SafeAreaView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#152218',
    flex:1,
    alignItems:"center"
  },
  project:{
    color: '#FFF',
    fontSize: 20,
  },
  button:{
    alignSelf: "stretch",
    backgroundColor: "#aaabac",
    margin:20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontWeight: "bold",
    fontSize: 18
  }
})