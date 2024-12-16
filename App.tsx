import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, Image } from 'react-native';

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
    var adTypes = [AdType.banner, AdType.interstitial];
    var appKey =
      Platform.OS === 'android'
        ? '<YOUR_ANDROID_APP_KEY>'
        : '<YOUR_IOS_APP_KEY>';
    await Appylar.initialize(appKey, adTypes, true);
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
    let canShowInterstitial = Appylar.canShowInterstitialAd();
    console.log('canShowInterstitial', canShowInterstitial);
    await Appylar.showInterstitialAd();
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerItem}>
        <Image style={styles.logo}
                  source={require("./assets/appylar_logo_icon.png")}
                />
      </View>
      <View style={styles.containerItem}>
        <View style={styles.emptyView} />
        <Button
          onPress={() => showBanner()}
          title="SHOW BANNER"
          color="#7590ba"
        />
        <View style={styles.emptyView} />
        <Button
          onPress={() => hideBanner()}
          title="HIDE BANNER"
          color="#7590ba"
        />
        <View style={styles.emptyView} />
        <Button
          onPress={() => showInterstitial()}
          title="SHOW INTERSTITIAL"
          color="#7590ba"
        />
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
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  containerItem: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyView: {
    height: 10,
  },
  emptyTopView: {
    height: 50,
  },
  containerBanner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
  },
  box: {
    marginVertical: 50,
  },
  logo: {
    width: 80,
    height: 80,
    alignContent: 'center',
    alignItems: 'center',
  }
});
