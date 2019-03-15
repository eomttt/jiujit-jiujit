#! /bin/bash

rm -rf platforms/android/app/build/outputs/apk/release/*
rm -rf keeproller.apk

ionic cordova build --release android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keeproller.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk keeproller-alias

./zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk keeproller.apk



