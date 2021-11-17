import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  Modal,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  RefreshControl,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';
import {useRoute, useFocusEffect, useIsFocused} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {height, width} = Dimensions.get('window');

const Dashboard = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userListData, setUserListDatas] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  //Spinner
  const [activityIndicator, setActivityIndicator] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    UserList();  
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    UserList();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const rt = useRoute();
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (rt.name === 'exit') {
          return false;
        } else {
          Alert.alert('Want to Exit App', 'Press Yes', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );
  const UserList = () => {
   
          fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(resData => {
              setActivityIndicator(false);
              setUserListDatas(resData);
              console.log('geted use datas cateched-->', resData);
            })
            .catch(error => {
              console.log('geted use datas cateched-->', error);
              setActivityIndicator(false);
            });
  };


  return (
    <>
      <LinearGradient
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1.2, y: 0}}
        colors={['#23C1DB', '#FDFFB8']}>
      
          <>
            <StatusBar backgroundColor="#23C1DB" barStyle="light-content" />

            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Pressable
                onPress={() => navigation.openDrawer()}
                style={{flexDirection: 'row', top: 15}}>
                <SimpleLineIcons name="menu" size={20} color="white" />
              </Pressable>
              <View style={{alignItems: 'center', top: -10}}>
                <Text
                  style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                 Resiliencesoft{/* {type} */}
                </Text>
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: 0}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>

              {/* Main Content */}

              <View style={styles.mainContent}>
                <View style={{marginTop: 10}}>
                  <View
                    style={[
                      styles.boxs,
                      {
                        transform: [{translateY: 0}],
                      },
                    ]}>
                    {userListData==null?null:userListData.map(data => {
                      return (
                        <View
                        key={data.id}
                          style={{
                            backgroundColor: 'white',
                            width: '100%',
                            borderRadius: 15,
                            padding: 15,
                            marginTop: 20,
                            shadowColor: 'black',
                            shadowOffset: 0.5,
                            elevation: 5,
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <LinearGradient
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderWidth: 5,
                                borderRadius: 100,
                                borderColor: 'white',
                                padding: 1,
                                width: 60,
                                height: 60,
                                marginRight: 10,
                                shadowColor: 'black',
                                shadowOffset: 0.2,
                                elevation: 3,
                              }}
                              start={{x: 0, y: 0}}
                              end={{x: 2, y: 0}}
                              colors={['#93F0FF', '#FCFFAF']}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 20,
                                  fontWeight: '400',
                                  fontWeight: 'bold',
                                }}>
                                {data.userId}
                              </Text>
                            </LinearGradient>

                            <Text
                              style={{
                                color: '#4F575D',
                                fontWeight: 'bold',
                                fontSize: 17,
                                marginTop: 5,
                                width: '83%',
                              }}>
                              {data.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              marginLeft: 70,
                              marginTop: -5,
                            }}>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View>
                              <Text
                                style={{
                                  color: '#8d9095',
                                  fontWeight: '900',
                                  fontSize: 15,
                                  lineHeight: 22,
                                  paddingHorizontal: 5,
                                }}>
                                {data.body}
                                {'...'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          </>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23C1DB',
  },
  boxs: {
    borderTopLeftRadius: 50,
    borderColor: '#e8e8e8',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerpart: {
    padding: 20,
  },
  mainContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    overflow: 'hidden',
  },
  footerArea: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Dashboard;
