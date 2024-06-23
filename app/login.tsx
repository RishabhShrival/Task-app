// AuthPage.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import {auth,store} from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RootStackParamList } from './navigatorpage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoginScreen = NativeStackScreenProps<RootStackParamList,'Login'>;

const AuthPage: React.FC<LoginScreen> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [Error,setError] = useState(null);
  const [success,setSuccess] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth,email,password);
      navigation.navigate('profile',{userId: userCredential.user.uid});
      setError(null);
      setSuccess("Successfull");
      
    } catch (error :any) {
      setError(error.message);
      console.error(error.message);
    }
  
  };

  const handleSignUp = async() =>  {
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
          <Button title="create account" onPress={handleSignUp} color={'grey'}/>
          {Error && <Text style={styles.error}>{Error}</Text>}
          {success && <Text style={styles.success}>Login Successfull</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  error:{
    color: 'red'
  },
  success:{
    color: 'green'
  },
});

export default AuthPage;
