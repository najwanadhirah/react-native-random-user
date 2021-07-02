import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase('db.db');

export default class dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.details = [],
      this.imageInfo = [],
      this.state = {
        date: '',
        username: '',
        searchTerm: '',
        url: '',
        items:[],
        loading:false
      }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  componentDidMount() {
    var that = this;

    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var today = weekday[d.getDay()];

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //Setting the value of the date time
      day: today,
      date: date + '/' + month + '/' + year,
      time: hours + ':' + min + ':' + sec,
      //time: hours + ':' + min,
    });
  }

  componentWillMount() {
    let urlbyusername = "https://randomuser.me/api/?username="+this.state.username+"&password="+this.state.password;
    fetch(urlbyusername)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ 
                        items: response.results,
                        loading : true
                     })
      });
 
  }


  
  render() {

    var wallpaper = require('./assets/bground.jpg');
    var {items,loading}=this.state
    const state = this.state;
    return (
      <View style={styles.pageStyle}>
        <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: '500',alignItems: 'center', marginLeft: "40%"}}>My Profile</Text>
        </View>

      

          <ImageBackground source={wallpaper} style={styles.slideContainer}>
     

            <LinearGradient colors={['#053f68', '#101315']} style={styles.slide1}>

            <ScrollView >

              <View style={{ flexDirection: 'row', width: "100%", marginTop: 15, }}>
                <View style={styles.firstRow}>

                {items.map(item=>(
                  <Text style={{ color: "white", fontSize: 13, fontWeight: '500' }}>Welcome, {item.name.title} {item.name.first}!</Text>
                  ))}

                  <View style={styles.userImage}>
                  {items.map(item=>(
          
                      <Image 
                      source={{uri: item.picture.large}}
                        style={{ width: 102, height: 102, borderRadius: 100 }}/>
                  ))}
                  </View>


                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.dateTime}>{this.state.day}, {this.state.date}</Text>

                  <View style={styles.time}>
                    <Text style={{ color: "white", fontSize: 30, fontWeight: '500' }}>{this.state.time}</Text>
                    
                  </View>

                  <View style={styles.thirdRow}>
                    <Icon name='map-marker' type='font-awesome' color='white' size={17} />
                    <Text style={{ color: "white", fontSize: 13, fontWeight: '500', paddingLeft: 10 }}>Kuala Lumpur, Malaysia</Text>
                  </View>

                </View>
          
              </View>


              <View style={styles.clockStyle}>
                <TouchableOpacity style={styles.clockin} onPress={() =>  Actions.friends() }>
                  <View >
                    <Icon name='child' type='font-awesome' color='white' size={35} />
                    <Text style={{ color: 'white', fontWeight: 'bold', paddingTop: 10 }}>Friends</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.clockin} onPress={() => { Alert.alert("No Function") }}>
                  <View>
                    <Icon name='gears' type='font-awesome' color='white' size={35} />
                    <Text style={{ color: 'white', fontWeight: 'bold', paddingTop: 10 }}>Setting</Text>
                  </View>
                </View>
              </View>

             
                      <View style={{ backgroundColor: 'white', margin: 25, borderRadius: 5, width: "88%", marginTop:-10}}>
                        <View style={{ width: "95%", marginTop: 2, justifyContent: 'center', }}>
                          
                          <View style ={{ marginLeft : 30, marginTop :20}}>
                            <Text >About Me</Text>
                          </View>
                          {items.map(item=>(
                     <View style ={{ marginTop:10, marginLeft :40 }}>

                           <View 
                          style={{ paddingTop: 0, width: "80%" , marginTop:12,  flexDirection: 'row',}}>
                                   <Icon name='user' size={18} type='font-awesome' color='#144563' />
                                      <Text style={{ marginLeft : 10}}> {item.name.title} {item.name.first} {item.name.last} </Text>
                           </View>
                       
  
                          <View 
                          style={{ paddingTop: 0, width: "80%" ,   flexDirection: 'row',  marginTop:12}}>
                                   <Icon name='envelope' size={18} type='font-awesome' color='#144563' />
                                      <Text style={{ marginLeft : 10}}>{item.email}</Text>
                           </View>

                           <View 
                          style={{ paddingTop: 0, width: "80%" , marginTop:12,  flexDirection: 'row',}}>
                                   <Icon name='map' size={17} type='font-awesome' color='#144563' />
                                      <Text style={{ marginLeft : 10}}>{item.location.state}</Text>
                           </View>

                           <View 
                          style={{ paddingTop: 0, width: "80%" , marginTop:12,  flexDirection: 'row',}}>
                                   <Icon name='venus-mars' size={18} type='font-awesome' color='#144563' />
                                      <Text style={{ marginLeft : 10}}>{item.gender}</Text>
                           </View>

                           <View 
                          style={{ paddingTop: 0, width: "80%" , marginTop:12,  flexDirection: 'row', marginBottom:10}}>
                                   <Icon name='phone' size={18} type='font-awesome' color='#144563' />
                                      <Text style={{ marginLeft : 10}}>{item.phone}</Text>
                           </View>
                           </View>
                          ))}
                        
                          </View>
                          </View>
                     
                          </ScrollView>
            </LinearGradient>
      
          </ImageBackground>
         
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: '#f8fcff',
  },
  header: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: '#053f68',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingBottom: 10,
    top: 0,
    paddingTop: 15

  },
  wrapper: {
    height: "100%",
    backgroundColor : 'white'
  },
  slideContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  slide1: {
    height: "100%",
    width: "100%",
    opacity: 0.9,
    paddingBottom: 10
  },

  userImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    width: 105,
    height: 105,
    marginTop: 10,
    marginLeft: 6
  },
  clockin: {
    flexDirection: 'row',
    width: "50%",
    backgroundColor: '#053f68',
    borderRadius: 5,
    padding: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  clockout: {
    flexDirection: 'row',
    width: "50%",
    backgroundColor: '#909090',
    borderRadius: 5,
    padding: 23,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    margin: 10
  },
  today: {
    width: "40%",
    borderBottomWidth: 1,
    borderBottomColor: "#aba8a8",
    marginLeft: 25
  },

  searchInput: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    width: "100%",
    backgroundColor: 'white',
  },
  search: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: "white",
    top: 5
  },
  boxTitle: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#e4e3e3',
    //marginTop: 10
  },

  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6
  },
  firstRow: {
    width: "45%",
    textAlign: 'right',
    paddingLeft: 20
  },
  secondRow: {
    width: "55%",
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: "#676666",
    marginTop: 15,
    left: 20
  },
  dateTime: {
    color: "white",
    fontSize: 13,
    fontWeight: '500',
    paddingTop: 0,
    paddingRight: 35
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 35,
    paddingTop: 5
  },
  thirdRow: {
    flexDirection: 'row',
    paddingLeft: "20%",
    paddingTop: 6,
    paddingRight: 30
  },
  clockStyle: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'center',
    padding: 30

  },
  footer: {
    position: 'absolute',
    bottom: 55,
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 1,
  },
  chat: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "20%",
    padding: 15,
    backgroundColor: '#a8d2e1',
    borderRadius: 3,

  },
  viewall2: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 15,
    width: "80%",
    borderRadius: 3,
  },
  titleSheet: {
    flexDirection: 'row',
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    width: "100%",
    padding: 15,
  },
  sheetList: {
    flexDirection: 'row',
    padding: 15,
    marginLeft: 10,
    marginRight: 10,

  },
  shareIcon: {
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10
  },
  sheetListWhassap: {
    paddingTop: 10,
    backgroundColor: '#00ad4e',
    borderRadius: 50,
    width: 50,
    height: 50,

  },
  sheetListGoogle: {
    paddingTop: 10,
    backgroundColor: '#ed1e25',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  sheetListTelegram: {
    paddingTop: 10,
    backgroundColor: '#0f7b9d',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  sheetListSkype: {
    paddingTop: 10,
    backgroundColor: '#23a3dd',
    borderRadius: 50,
    width: 50,
    height: 50,
  },

  share: {
    marginRight: 10,
    backgroundColor: '#007dc6',
    borderRadius: 50,
    width: 35,
    height: 35,
    shadowColor: '#cbcbcb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 3,
    paddingTop: 6,
  },
  head: {
    height: "100%",
    backgroundColor: '#f1f8ff'
  },
  wrapper: {
    flexDirection: 'row'
  },
  tableTitle: {
    backgroundColor: '#f6f8fa',
    textAlign: 'left'
  },
  tableText: {
    paddingLeft: 10,
    fontSize: 12,
  },
  row: {
    height: 40
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  content: {
    paddingTop: "5%",
    backgroundColor: '#f8fcff',
    width: "100%",
    height: "100%"
  }

});