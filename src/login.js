import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Alert, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import { TextInput } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.registerCall = this.registerCall.bind(this);
  }

  registerCall() {

    let payload = {
      "username": this.state.username,
      "password": this.state.password,
    };

    let urlbyusername = "https://randomuser.me/api/?username="+this.state.username+"&password="+this.state.password;
    fetch(urlbyusername)
      .then((response) => response.json())
      .then((responseJson) => {
      });

      Actions.dashboard();
  
}



  clickSignin = (id) => {
    if (this.state.username) {

  

      if (this.state.password) {
     
        if (this.state.password.length > 0) {
          this.registerCall();
        }
       
      }
      else {
        Alert.alert("Please enter password");
      }
    }
    else {
      Alert.alert("Please enter username");
    }
  }

  press = () => {
    this.setState((state) => ({
      checked: !state.checked,
    }));
  }

  render() {
    var wallpaper = require('../src/assets/bground.jpg');
    return (

      <ImageBackground source={wallpaper} style={styles.pageStyle}>
        

        <View style={{ backgroundColor: '#14304D', opacity: 0.8, height: "100%" }}></View>

        <View style={{ alignItems: 'center', position: 'absolute', width: "100%" }}>

        <Image style={styles.logo} source={require("../src/assets/wc.png")} />
          <Text style={styles.titletext}>Welcome Back!</Text>
          <Text style={styles.subtitletext}>Sign in to your account now </Text>

          <View style={{ backgroundColor: 'white', margin: 25, borderRadius: 10, width: "85%", }}>

            <View style={{ width: "95%", marginTop: "1%", justifyContent: 'center', }}>


              <View style={styles.inputContainer}>
                <Icon name='user' type='font-awesome' color='#145882' size={21} />
                <TextInput style={styles.inputs}
                  label="username"
                  underlineColor='#dadada'
                  theme={{ colors: { text: 'black', primary: '#017DC5' } }}
                  returnKeyType="next"
                  autoCapitalize='none'
                  keyboardType="username-address"
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name='key' type='font-awesome' color='#145882' size={20} />
                <TextInput style={styles.inputs}  
                  label="Password"
                  placeholderTextColor="#18387E"
                  returnKeyType='go'
                  secureTextEntry={true}
                  autoCorrect={false}
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })} />
              </View>

            </View>

            <View style={{ width: "100%", marginTop: 20, flexDirection: 'row' }}>

              <View style={{ width: "60%", flexDirection: 'row' }}>
                <View style={{ marginTop: -15, marginLeft: 10 }} >
                  <CheckBox
                    checked={this.state.checked}
                    onPress={() => {
                      this.setState({ checked: !this.state.checked });
                    }}
                    color="#017DC5"
                    size={20} />
                </View>
                <Text style={styles.remember}>Remember Me</Text>
              </View>

              <TouchableOpacity style={{ width: "40%", }}  onPress={() => {  Alert.alert('No Function'); }} >
                <Text style={styles.forgot}> Forgot Password</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.alignButton}>

              <TouchableOpacity  onPress={() => {  Alert.alert('No Function'); }}>
                <LinearGradient colors={['#ff6565', '#980909']} style={styles.buttonContainer}>
                  <Text style={styles.signUpText}>Sign In with Google</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.clickSignin.bind(this)} >
                <LinearGradient colors={['#017DC5', '#05273c']} style={styles.buttonContainer}>
                  <Text style={styles.signUpText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>

            </View>

          </View>

          <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 13,
            }}> Not a member?</Text>

            <TouchableOpacity onPress={() => {  Alert.alert('No Function'); }} >
              <Text style={{
                color: '#36aef4',
                fontWeight: 'bold',
                fontSize: 13,
                textDecorationLine: 'underline',
                marginLeft: 10
              }}> Sign up now</Text>
            </TouchableOpacity>

          </View>

        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  titletext: {
    marginBottom: 20,
    color: 'white',
    fontSize: 23,
    fontWeight: "bold",
  },
  subtitletext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
    width: 120,
    marginRight: 5,
    marginLeft: 5
  },
  signUpText: {
    fontSize: 12,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 15,
    paddingTop: 10
  },
  alignButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    flexDirection: 'row',
    marginTop:-10,
    padding: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
  },
  inputs: {
    fontSize: 16,
    color: '#212121',
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5
  },
  input2: {
    fontSize: 16,
    flex: 1,
    width: "100%",
    borderRadius: 5,
    paddingLeft: 5,
  },
  remember: {
    color: '#7b7b7b',
    fontWeight: '500',
    fontSize: 13,
    marginLeft: -10
  },
  forgot: {
    color: '#7b7b7b',
    fontWeight: '500',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  IPSave: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 15
  },
  logo: {
    width: 200,
    height: 130,
    marginBottom: 0
  },
});