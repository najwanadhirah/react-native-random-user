import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase('db.db');

export default class friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchTerm: '',
            visible: false,
            allData: [],
            page: 1,
            seed: 1,
            isFetching: false,
            isLoading: true,
            dataBackup: [],  
        }
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    componentWillMount() {
        db.transaction((tx) => {
            tx.executeSql('create table if not exists users (id integer primary key not null, userID integer, title text, firstname text, secondname text, email text, address text, gender text, phone text, image text)');
        });
    }

    componentDidMount() {
        this.LoadRandomData()
        }

       

        LoadRandomData = () => {
            fetch("https://randomuser.me/api/?results=10&page=1")
            .then(response => response.json())
            .then(responseJson => {
            this.setState({
            randomUserData: this.state.page === 1 ? responseJson.results : [...this.state.randomUserData, ...responseJson.results],
            dataBackup : this.state.page === 1 ? responseJson.results : [...this.state.randomUserData, ...responseJson.results]
        
            })
            }).catch(error => {
            console.log('Error selecting random data: ' + error)
            })
            }


            filterList = (text) => {
                var newData = this.state.dataBackup;
                newData = this.state.dataBackup.filter((item) => {
                    const itemData = item.name.first.toLowerCase()
                    //const itemData = `${item.title.toUpperCase()} ${item.id.toUpperCase()}`;
                    const textData = text.toLowerCase()
                    return itemData.indexOf(textData) > -1
                });
                this.setState({
                    query: text,
                    randomUserData: newData // after filter we are setting users to new array  
                });
            }


    render() {


        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#053f68' }}>
                    {this.state.noProject ?
                        <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 20, top: -180 }}>No Project To Be Selected</Text>
                            <Text style={{ fontSize: 15, top: -170 }}>Please setup the project in web</Text>
                        </View>
                        :
                        <View style={styles.listUser}>
                            <View style={styles.SectionStyle}>
                                <View style={{ paddingLeft: 20, paddingRight: 12 }}>
                                    <Icon name="search" type='font-awesome' color="#a5a5a5" size={20} />
                                </View>

                                <TextInput
                                    style={{ flex: 1, top: 2 }}
                                    placeholderTextColor='grey'
                                    placeholder="Search Here"
                                    underlineColorAndroid="transparent"
                                    value={this.state.query}
                                    onChangeText={(text) => this.filterList(text)}
                                />
                            </View>

                            <FlatList
                                style={{ marginTop: 20 , backgroundColor: "#053f68"}}
                                data={this.state.randomUserData}
                                renderItem={({ item }) =>
                                    <TouchableOpacity style={styles.list} onPress={() => {

                                    
                                        db.transaction((tx) => {
                                            const sql = 'insert into users (userID, title, firstname, secondname, email, address, gender, phone, image) values (?,?,?,?,?,?,?,?,?)';
                                            
                                            tx.executeSql(sql, [item.name.title, item.name.title, item.name.first, item.name.last, item.email, item.location.state, item.gender, item.phone, item.picture.large], (tx, results) => {
                                            });
                                      
                                           Actions.friendProfile();
                                        });
                                    }}>

                                    <Image source={{ uri: item.picture["large"] }} style={{ width: 50, height: 50, borderRadius: 100, marginLeft:10 }} />
                                  
                                        <View style={{ width: "60%", marginLeft:20 }}>

                                            <Text style={styles.lightText}>{item.name.first}</Text>
                                        </View>

                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#053f68",
        // justifyContent: 'center'
    },
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        shadowColor: '#b5b5b5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        height: 50,
        borderRadius: 5,
    },
    list: {
        flexDirection: 'row',
        marginBottom: 12,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    lightText: {
        paddingTop: 5,
        color:'white'
    },
    chatPopup: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'flex-end',
        paddingTop: 15,
        paddingBottom: 15,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 3,
    },
    btnBlue: {
        color: '#017DC5',
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 3,
        fontWeight: 'bold',
        fontSize: 15
    },
    popupUser: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        flexDirection: 'row',
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1,
    },
    listUser: {
        flexDirection: 'column',
        width: "100%",
        marginBottom: "12%",
        borderTopColor: '#eaeaea',
        borderTopWidth: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10,
        width: 100,
        marginRight: 5,
        marginLeft: 5,
        height: 30,
        paddingLeft: 15,
        paddingTop: 3
    },
    userImg: {
        width: "100%",
        height: "100%",
    },
});

