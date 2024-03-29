package com.home;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dooboolab.RNAudioRecorderPlayerPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.goodatlas.audiorecord.RNAudioRecordPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AsyncStoragePackage(),
            new RNUUIDGeneratorPackage(),
            new VectorIconsPackage(),
            new ReactSliderPackage(),
            new RNFetchBlobPackage(),
            new RNAudioRecorderPlayerPackage(),
            new ReactNativeAudioPackage(),
            new RNSoundPackage(),
            new RNAudioRecordPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
