import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';

import Appylar, { AdType, AppylarBannerView } from '@appylar/react-native-appylar-sdk';

export default function App() {
  const [show, setShow] = useState(false);
  const appylarViewRef = useRef(null);

  useEffect(() => {
    Appylar.eventEmitter.addListener('onInitialized', onInitialized);
    Appylar.eventEmitter.addListener('onError', onError);
    Appylar.eventEmitter.addListener('onBannerShown', onBannerShown);
    Appylar.eventEmitter.addListener('onNoBanner', onNoBanner);
    Appylar.eventEmitter.addListener(
      'onInterstitialShown',
      onInterstitialShown
    );
    Appylar.eventEmitter.addListener(
      'onInterstitialClosed',
      onInterstitialClosed
    );
    Appylar.eventEmitter.addListener('onNoInterstitial', onNoInterstitial);
    initialize();
    return () => {
      Appylar.eventEmitter.removeAllListeners('onInitialized');
      Appylar.eventEmitter.removeAllListeners('onError');
      Appylar.eventEmitter.removeAllListeners('onBannerShown');
      Appylar.eventEmitter.removeAllListeners('onNoBanner');
      Appylar.eventEmitter.removeAllListeners('onInterstitialShown');
      Appylar.eventEmitter.removeAllListeners('onInterstitialClosed');
      Appylar.eventEmitter.removeAllListeners('onNoInterstitial');
    };
  }, []);

  const initialize = async () => {
    console.log('initialize111');
    var adTypes = [AdType.banner, AdType.interstitial];
    var appKey =
      Platform.OS === 'android'
        ? 'oq8KqmAv7CmWST23FS12-g'
        : 'knZidxcpufCJLTfwJbbm4w';
    await Appylar.initialize(appKey, adTypes, false);
    await setParameters();
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
    // if(appylarViewRef.canShowAd()){
    //   setShow(true);
    // }
    setShow(true);
  };

  const hideBanner = async () => {
    setShow(false);
  };

  const showInterstitial = async () => {
    let canShowInterstitial = Appylar.canShowAd();
    console.log('canShowInterstitial', canShowInterstitial);
    await Appylar.showAd();
  };

  const setParameters = async () => {
    let obj = {
      banner_height: ['90']
    };
    Appylar.setParameters(obj);
  };

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
        <Button
          onPress={() => setParameters()}
          title="SET PARAMETERS"
          color="#841584"
        />
      </View>
      <View style={styles.containerBanner}>
        <AppylarBannerView
          show={show}
          placementId=""
          style={styles.box}
          ref={appylarViewRef}
        />
        <AppylarBannerView
          show={show}
          placementId=""
          style={styles.box}
          ref={appylarViewRef}
        />
        <AppylarBannerView
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
    marginVertical: 50,
  },
});
