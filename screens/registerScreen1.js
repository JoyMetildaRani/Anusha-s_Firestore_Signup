import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from '../firebase';

import { useNavigation } from '@react-navigation/native'; 

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();


  const handleContinue = async () => {
    //Validate name field

    if (!name.trim()) {
      Alert.alert('Name is required !');
    }

    // Validate email field
    else if (!email.trim()) {
      Alert.alert('Email is required !');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Email is invalid !');
    }
    //Validate Phone number
    else if (!phoneNumber.trim()) {
      Alert.alert('Phone Number is required !');
    } else if (phoneNumber.length < 10) {
      Alert.alert('Phone should be 10 digits !');
    }

    // Validate password field
    else if (!password.trim()) {
      Alert.alert('Password is required !');
    } else if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters!');
    } 






    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        setUserId(user.uid);
        await user.updateProfile({ displayName: name,phoneNumber});
        
        await user.sendEmailVerification();
   

         // Add user data to Firestore
         const db = firebase.firestore();
         await db.collection('users').doc(user.uid).set({
           name: name,
           email: email,
           phoneNumber: phoneNumber,
           createdAt: firebase.firestore.FieldValue.serverTimestamp()
         });
        Alert.alert('Verification Email sent');
        console.log(user)
        navigation.navigate('NextScreen', { userId: user.uid }); // Change 'NextScreen' to your next screen name
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert(error.message);
    }
      
    
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name*"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number*"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password*"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDECEC',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#B56576',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#B56576',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  verifyButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignSelf: 'space-around',
  },
  text: {
    color: 'white',
  },
});

export default CreateAccount;
