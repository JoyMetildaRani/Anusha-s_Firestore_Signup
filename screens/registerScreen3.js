import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image, PermissionsAndroid, Platform 
} from 'react-native';
import firebase from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation  } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';


const Registerscreen3 = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [whyJoin, setWhyJoin] = useState('');
  const [howLearn, setHowLearn] = useState('');
  const [meetFrequency, setMeetFrequency] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
  };


  const uploadImage = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`profileImages/${userId}`);
    await ref.put(blob);
    return ref.getDownloadURL();
  };


  const handleChoosePhoto = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access gallery',
          message: 'App needs access to your gallery to select a photo.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permissions denied');
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      console.log("enetered")
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        console.log(imageUri)
      }
    });
  };


  const handleContinue = async () => {
    if (!whyJoin.trim() || !howLearn.trim() || !meetFrequency.trim()) {
      Alert.alert('All fields are required!');
      return;
    }

    
    const userId = firebase.auth().currentUser.uid;
    console.log(userId)
    let imageUrl = null;

    // if (image) {
    //   imageUrl = await uploadImage(image.uri, userId);
    // }

    const userProfileData = {
      imageUri,
      whyJoin,
      howLearn,
      meetFrequency,
    };

    try {
     

      const db = firebase.firestore();
      await db.collection('users').doc(userId).update(userProfileData);

      Alert.alert('Profile info saved successfully!');
      alert("Profile saved successfully")
      // Navigate to the next screen if needed
      navigation.navigate("Login")
    } catch (error) {
      Alert.alert('Error saving profile info:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a Profile Picture</Text>
      <TouchableOpacity onPress={handleChoosePhoto}>
          <Text>Pick an Image</Text>
        </TouchableOpacity>
        <View >
        
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )}
          
          </View>
          
    
     
      <TextInput
        style={styles.input}
        placeholder="Why did you join the app?"
        value={whyJoin}
        onChangeText={setWhyJoin}
      />
      <TextInput
        style={styles.input}
        placeholder="How did you learn about the app?"
        value={howLearn}
        onChangeText={setHowLearn}
      />
      <TextInput
        style={styles.input}
        placeholder="How regularly would you like to meet someone?"
        value={meetFrequency}
        onChangeText={setMeetFrequency}
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
    backgroundColor: '#FDECEC',
    padding: 16,
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
    textAlign: 'center',
  },
  placeholder: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignSelf: 'center',
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



export default Registerscreen3