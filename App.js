import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { createClient } from "@supabase/supabase-js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const supabase = createClient("https://kksjymuyhfpfhighcumq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrc2p5bXV5aGZwZmhpZ2hjdW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNjk4MDIsImV4cCI6MjA1NTY0NTgwMn0.6ODkzw6MCHecCxJEat33goJq6Vemu-GYZbMkBmyYthc");

const Stack = createStackNavigator();

export default function App() {
  const [ contaCriada, setContaCriada ] = useState(false);

  function Registro({ navigation }) {
    const [ users, setUsers ] = useState([]);
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ pass, setPass ] = useState("");
  
    async function loginreg() {
      const { data, error } = await supabase
                                        .from("users")
                                        .insert([
                                          { name: name, email: email, pass: pass }
                                        ])
                                        .select();
      alert("Conta criada");
      navigation.navigate('Home');
      setContaCriada(true);
    };
  
    useEffect(() => {
      getUsers();
    });
  
    async function getUsers() {
      const { data } = await supabase.from("users").select();
      setUsers(data);
    }
  
    return (
      <View>
        {/* <View style={styles.header}>
          <Text style={styles.h1}>Registro</Text>
        </View> */}
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <Text style={styles.inputText}>Nome</Text>
            <TextInput
              placeholder="Seu nome"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              placeholder="Seu email aqui"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.inputText}>Senha</Text>
            <TextInput
              secureTextEntry
              placeholder="Sua nova senha aqui"
              style={styles.input}
              value={pass}
              onChangeText={setPass}
            />
            <View style={styles.button} onTouchEnd={loginreg}>
              <Text style={styles.btnText}>Criar Conta</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  function Home({ navigation }) {
    return (
      <View style={styles.homeContainer}>
        { contaCriada ?
          <View>
            <Text>hahahaha</Text>
          </View>
          :
          <View style={styles.button}>
            <Text>O que deseja fazer?</Text>
            <Text style={styles.btnText} onPress={() => {navigation.navigate('Registro')}}>Criar Conta</Text>
          </View>
        }
      </View>
    )
  }

  function Login() {
    return (
      <View>
        <Text>Não implementado ainda</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(150, 150, 150)",
    padding: 15,
    paddingTop: 60,
    height: 110,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center"
  },
  h1: {
    fontSize: 25,
    color: "white"
  },
  input: {
    borderRadius: 10,
    backgroundColor: "lightgray",
    padding: 10,
    width: 200,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
    marginBottom: 300
  },
  loginContainer: {
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "rgb(150, 150, 150)",
    borderRadius: 15,
    width: 250,
    alignItems: "center",
    height: 320,
    marginTop: 50
  },
  inputText: {
    color: "white",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "left",
  },
  button: {
    backgroundColor: "rgb(170,170,170)",
    margin: 15,
    padding: 10,
    borderRadius: 10
  },
  btnText: {
    color: "white",
    fontWeight: "bold"
  },
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});