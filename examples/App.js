/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SearchBox from 'rn-search-box'

const App = () => {
  const [text, setText] = useState('')
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SearchBox
          style={{ marginHorizontal: 16, maxWidth: 300 }}
          startIcon={require('./images/search.png')} 
          onChange={setText}
          cornerRadius={8}
          value={text}
          onCancel={()=> {
            setText('')
          }}
          enableCancel
          persistentCancel
          />
          <Text style={{marginTop: 24}}>Data: {text}</Text>
      </SafeAreaView>
    </>
  );
};



export default App;
