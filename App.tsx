import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
} from 'react-native';

import  RNAppylar, {
  RNAppylarAdType,
  RNAppylarView
} from 'react-native-appylar-sdk';

export default function App() {
  const [show, setShow] = useState(false);
  const appylarViewRef = useRef(null);

  useEffect(() => {
    RNAppylar.eventEmitterAppylar.addListener('onInitialized', onInitialized);
    RNAppylar.eventEmitterAppylar.addListener('onError', onError);
    RNAppylar.eventEmitterAppylar.addListener('onBannerShown', onBannerShown);
    RNAppylar.eventEmitterAppylar.addListener('onNoBanner', onNoBanner);
    RNAppylar.eventEmitterAppylar.addListener(
      'onInterstitialShown',
      onInterstitialShown
    );
    RNAppylar.eventEmitterAppylar.addListener(
      'onInterstitialClosed',
      onInterstitialClosed
    );
    RNAppylar.eventEmitterAppylar.addListener(
      'onNoInterstitial',
      onNoInterstitial
    );
    initialize();
    return () => {
      RNAppylar.eventEmitterAppylar.removeAllListeners('onInitialized');
      RNAppylar.eventEmitterAppylar.removeAllListeners('onError');
      RNAppylar.eventEmitterAppylar.removeAllListeners('onBannerShown');
      RNAppylar.eventEmitterAppylar.removeAllListeners('onNoBanner');
      RNAppylar.eventEmitterAppylar.removeAllListeners('onInterstitialShown');
      RNAppylar.eventEmitterAppylar.removeAllListeners('onInterstitialClosed');
      RNAppylar.eventEmitterAppylar.removeAllListeners('onNoInterstitial');
    };
  }, []);

  const initialize = async () => {
    console.log('initialize111');
    var adTypes = [RNAppylarAdType.banner, RNAppylarAdType.interstitial];
    var appKey =
      Platform.OS === 'android'
        ? 'oq8KqmAv7CmWST23FS12-g'
        : 'knZidxcpufCJLTfwJbbm4w';
    await RNAppylar.initialize(appKey, adTypes, false);
  };

  const onInitialized = (eventObj: any) => {
    console.log('App.tsx onInitialized', eventObj);
  };

  const onError = (eventObj: any) => {
    console.log('App.tsx onError', eventObj);
  };

  const onBannerShown = (eventObj: any) => {
    console.log('App.tsx onBannerShown', eventObj);
  };

  const onNoBanner = (eventObj: any) => {
    console.log('App.tsx onNoBanner', eventObj);
  };

  const onInterstitialShown = (eventObj: any) => {
    console.log('App.tsx onInterstitialShown', eventObj);
  };

  const onInterstitialClosed = (eventObj: any) => {
    console.log('App.tsx onInterstitialClosed', eventObj);
  };

  const onNoInterstitial = (eventObj: any) => {
    console.log('App.tsx onNoInterstitial', eventObj);
  };

  const showBanner = async () => {
    setShow(true);
  };

  const hideBanner = async () => {
    setShow(false);
  };

  const showInterstitial = async () => {
    await RNAppylar.showAd();
  };

  // const setParameters = async () => {
  //   let obj = {
  //     banner_height: ['90'],
  //     age_restriction: ['18'],
  //   };
  //   RNAppylar.setParameters(obj);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.containerButtons}>
        <Text style={styles.heading}>Appylar Sample App</Text>
        <Button
          onPress={() => showBanner()}
          title="SHOW BANNER"
          color="#841584"
        />
        <View style={styles.emptyView} />
        <Button
          onPress={() => hideBanner()}
          title="HIDE BANNER"
          color="#841584"
        />
        <View style={styles.emptyView} />
        <Button
          onPress={() => showInterstitial()}
          title="SHOW INTERSTITIAL"
          color="#841584"
        />
        <View style={styles.emptyView} />
      </View>
      <View style={styles.containerBanner}>
        <RNAppylarView
          show={show}
          placementId=""
          style={styles.box}
          ref={appylarViewRef}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerButtons: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyView: {
    height: 10,
  },
  containerBanner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  box: {
    marginVertical: 50
  },
});
