import React, {useEffect, useState} from 'react';
import {useRoute, useFocusEffect, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

const UserList = ({navigation}) => {
  //Spinner
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [listData, setListDatas] = React.useState([]);
  const isFocused = useIsFocused();
  const color = ['#E6B0AA', '#ffd338', '#D7BDE2', '#3498DB'];
  useEffect(() => {
    // setActivityIndicator(true);
    getList();
  }, [isFocused]);

  const getList = () => {
        setActivityIndicator(true);
          fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(resData => {
              setActivityIndicator(false);
              setListDatas(resData);
              // console.log(resData);
            })
            .catch(e => {
              alert(e);
              setActivityIndicator(false);
            });
         };
  const rt = useRoute();
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (rt.name === 'exit') {
          return false;
        } else {
          navigation.navigate('Dashboard');
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#23C1DB" barStyle="light-content" />
      {/* Header Part */}
      <LinearGradient
        style={styles.headerPart}
        start={{x: 0, y: 0}}
        end={{x: 1.2, y: 0}}
        colors={['#23C1DB', '#FDFFB8']}>
        <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="arrow-back-ios" size={25} color="#fff" />
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
            Users List
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <>
        {/* Spinner */}
        <Modal
          transparent={true}
          visible={activityIndicator}
          onRequestClose={() => {
            setActivityIndicator(!activityIndicator);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItem: 'center',
              backgroundColor: '#8886',
            }}>
            <ActivityIndicator size="large" color="#662d91" />
          </View>
        </Modal>
        {/* Spinner */}
        {/* Main Content */}

        <View style={styles.mainContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 10}}>
            {listData == '' || listData == null ? (
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#8d8d8d', alignItems: 'center'}}>
                  No Records found
                </Text>
              </View>
            ) : (
              listData.map((data, index) => {
                var i = 0;
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Profile', {user_data: data})
                      }
                      style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          width: 42,
                          height: 42,
                          backgroundColor: `${
                            index % 4 === 0
                              ? '#E6B0AA'
                              : index % 4 === 1
                              ? '#ffd338'
                              : index % 4 === 2
                              ? '#D7BDE2'
                              : '#3498DB'
                          }`,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 100,
                          marginRight: 15,
                        }}>
                        <Text
                          style={{
                            fontWeight: '900',
                            fontSize: 28,
                            color: '#fff',
                          }}>
                          {data.username.substring(0, 1)}
                        </Text>
                      </View>
                      <View style={{flexWrap: 'wrap'}}>
                        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '900',
                              fontSize: 19,
                              flexWrap: 'wrap',
                            }}>
                            {data.name}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#8d8d8d'}}>
                            {data.website}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#8d8d8d'}}>
                            {data.email}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#8d8d8d'}}>
                            Address - {data.address.street}  {data.address.suite}  {data.address.city}  {data.address.zipcode} 

                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#8d8d8d'}}>
                           Company :  {data.company.name}{"\n"}
                           Catch Phrase - {data.company.catchPhrase}~{"\n"}
                           BS -  {data.company.bs}
                          </Text>
                        </View>

                    
                      </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `tel:${
                              data.phone === '' ? null : data.phone
                            }`,
                          )
                        }
                        style={{
                          width: 50,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 100,
                          marginRight: 0,
                        }}>
                        <Image
                          source={require('../assets/img/phoneCall.png')}
                          style={{width: 27, height: 27}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerPart: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#23C1DB',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  mainContent: {
    flex: 15,
    backgroundColor: '#fff',
    marginLeft: 14,
    marginRight: 7,
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default UserList;
