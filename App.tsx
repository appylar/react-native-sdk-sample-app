import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, Pressable } from 'react-native';

import Appylar, { AdType, AppylarBannerView } from '@appylar/react-native-appylar-sdk';

export default function App() {
  const [show, setShow] = useState(false);
  const appylarViewRef = useRef(null);
  const [statusText, setStatusText] = useState('Initializing the SDK, please wait...');

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
    var adTypes = [AdType.banner, AdType.interstitial];
    var appKey =
      Platform.OS === 'android'
        ? '<YOUR_ANDROID_APP_KEY>'
        : '<YOUR_IOS_APP_KEY>';
    await Appylar.initialize(appKey, adTypes, true);
  };

  const onInitialized = (eventObj: any) => {
    console.log('App.tsx onInitialized', eventObj);
    setStatusText("The SDK is initialized.");
  };

  const onError = (eventObj: any) => {
    console.log('App.tsx onError', eventObj);
    setStatusText("Error: " + eventObj);
  };

  const onBannerShown = (eventObj: any) => {
    console.log('App.tsx onBannerShown', eventObj);
    setStatusText("");
  };

  const onNoBanner = (eventObj: any) => {
    console.log('App.tsx onNoBanner', eventObj);
    setStatusText("No banners in the buffer.");
  };

  const onInterstitialShown = (eventObj: any) => {
    console.log('App.tsx onInterstitialShown', eventObj);
    setStatusText("");
  };

  const onInterstitialClosed = (eventObj: any) => {
    console.log('App.tsx onInterstitialClosed', eventObj);
    setStatusText("");
  };

  const onNoInterstitial = (eventObj: any) => {
    console.log('App.tsx onNoInterstitial', eventObj);
    setStatusText("No interstitials in the buffer.");
  };

  const showBanner = async () => {
    setShow(true);
  };

  const hideBanner = async () => {
    setShow(false);
  };

  const showInterstitial = async () => {
    let canShowInterstitial = Appylar.canShowInterstitialAd();
    console.log('canShowInterstitial', canShowInterstitial);
    await Appylar.showInterstitialAd();
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerItem}>
        <Text style={styles.heading}>Appylar React Native Sample App</Text>
        <Pressable style={styles.button} onPress={() => showBanner()}>
          <Text style={styles.buttonText}>SHOW BANNER</Text>
        </Pressable>  
        <Pressable style={styles.button} onPress={() => hideBanner()}>
          <Text style={styles.buttonText}>HIDE BANNER</Text>
        </Pressable>      
        <Pressable style={styles.button} onPress={() => showInterstitial()}>
          <Text style={styles.buttonText}>SHOW INTERSTITIAL</Text>
        </Pressable>
        <Text style={styles.statusText}>{statusText}</Text>
        </View>
        <View style={styles.containerBanner}>
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
  button: {
    borderRadius: 8,
    backgroundColor: "#7590ba",
    marginVertical: 7,
    width: 200
  },
  buttonText: {
    color: "#ffffff",
    textAlign: 'center',
    padding: 5,
    marginVertical: 5
  },

  containerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  containerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerBanner: {    
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
    color: "#293642",
  },
  statusText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: "#293642",
  },
  box: {
    height: 100, 
    marginVertical: 0
  },
});
