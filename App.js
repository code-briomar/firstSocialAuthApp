import React, {useState} from "react"
import {View, Button, StyleSheet} from "react-native"

//Google Auth
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

function App(){
  const [user, setUser] = useState();
  GoogleSignin.configure({
    webClientId: '1061595995670-7a8csqfegh4792gvo00l4k7430vjn2jo.apps.googleusercontent.com',
  });
  async function signInWithGoogleAsync() {
      // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then((User)=>{
      setUser((prevUser)=>prevUser = User)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return(
    <View style={pretty.container}>
      <Button 
        title="Sign In with Google"
        onPress={signInWithGoogleAsync}
      />
      <Text>{user}</Text>
    </View>
  )
}

const pretty = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange'
  }
})
export default App