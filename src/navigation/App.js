import React,{ useEffect} from 'react';
import Providers from './navigation';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  })
  return <Providers />;
}
export default App;