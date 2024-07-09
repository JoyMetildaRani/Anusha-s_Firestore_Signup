import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  CheckBox,
  Picker,
} from 'react-native';
import { useNavigation,useRoute  } from '@react-navigation/native';
import firebase from '../firebase';



const RegisterScreen2 = () => {
  const [age, setAge] = useState('');
  const [region, setRegion] = useState('');
  const [interests, setInterests] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const handleInterestChange = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleContinue = async() => {
    if (!age.trim()) {
      Alert.alert('Age is required!');
      return;
    }
    if (!region.trim()) {
      Alert.alert('Region is required!');
      return;
    }
    if (interests.length === 0) {
      Alert.alert('At least one interest is required!');
      return;
    }

 
    const db = firebase.firestore();
    await db.collection('users').doc(userId).update({
      Age: age,
      Region: region,
      Interests: interests,
      UpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    navigation.navigate('FinalScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell us more about you!</Text>
      <TextInput
        style={styles.input}
        placeholder="Age*"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={region}
        style={styles.picker}
        onValueChange={(itemValue) => setRegion(itemValue)}
      >
        <Picker.Item label="Select an Item" value="" />
        <Picker.Item label="North" value="North" />
        <Picker.Item label="South" value="South" />
        <Picker.Item label="East" value="East" />
        <Picker.Item label="West" value="West" />
        <Picker.Item label="Central" value="Central" />
      </Picker>
      <Text style={styles.subtitle}>Your Interests*</Text>
      <View style={styles.checkboxContainer}>
        {['Music', 'Dance', 'Reading', 'Sports', 'Cooking', 'Art', 'Business/Finance', 'Travelling', 'Gardening', 'Nature + Walking'].map((interest) => (
          <View key={interest} style={styles.checkboxWrapper}>
            <CheckBox
              value={interests.includes(interest)}
              onValueChange={() => handleInterestChange(interest)}
            />
            <Text>{interest}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDECEC',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#B56576',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#B56576',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#B56576',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default RegisterScreen2;
