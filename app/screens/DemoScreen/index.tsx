import {Image, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../utils/imports/imports';

const DemoScreen = () => {
  return (
    <LinearGradient
      colors={['#000', '#fff', '#004D9E']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
      }}>
      <Image
        source={images.Logo}
        resizeMode="contain"
        style={{width: '80%', alignSelf: 'center'}}
      />
    </LinearGradient>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({});
