import React, { useEffect, useState } from 'react';
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
  Modal,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Entypo';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
const Profile = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const profileData = route.params.user_data;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#23C1DB" barStyle="light-content" />


      {/* Header Part */}

      <View style={styles.headerpart}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="arrow-back-ios" size={25} color="#4c525a" />
          <Text style={{ fontSize: 19, color: '#4c525a' }}>Profile Details</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}

      <View style={styles.mainContent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <Image
                source={require('../assets/img/user.png')}
                style={{ width: 240, height: 240, borderRadius: 15 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{ fontSize: 24, fontWeight: 'bold', color: '#4b4c50' }}>
                {profileData.name}
              </Text>
              <Text> </Text>
              <Text style={{ fontSize: 24, color: '#5732d2' }}>
                ({profileData.username})
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{ fontSize: 20, color: '#4b4c50' }}>
                {profileData.company.name}
              </Text>
              <Text style={{ fontSize: 24, color: '#4b4c50' }}>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{ fontSize: 20, color: '#4b4c50' }}>
                {profileData.address.street}   {profileData.address.suite}   {profileData.address.zipcode}
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                padding: 11,
                borderRadius: 10,
                marginBottom: 8,
                borderColor: '#f1f2f3',
              }}>
              <View
                style={{
                  backgroundColor: '#dfe0fa',
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  marginRight: 10,
                }}>
                <Iconss name="email" size={40} color="#5530d2" />
              </View>
              <View style={{}}>
                <Text style={{ color: '#4b4c50', fontSize: 16 }}>
                  {profileData.email}
                </Text>
                <Text style={{ color: '#4b4c50' }}>Email</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                padding: 11,
                borderRadius: 10,
                marginBottom: 8,
                borderColor: '#f1f2f3',
              }}>
              <View
                style={{
                  backgroundColor: '#fef5e6',
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  marginRight: 10,
                }}>
                <Iconss name="run" size={40} color="#f9980a" />
              </View>
              <View style={{}}>
                <Text style={{ color: '#4b4c50', fontSize: 16 }}>
                 {profileData.phone === '' ? null : profileData.phone}
                </Text>
                <Text style={{ color: '#4b4c50' }}>Contact Number</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerpart: {
    flex: 1,
    padding: 20,
  },
  mainContent: {
    flex: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
});

export default Profile;
