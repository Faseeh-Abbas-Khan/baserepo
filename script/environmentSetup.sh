#!/bin/bash
cd ..
echo "Back in root directory"
BUILD_GRADLE_PATH="android/app/build.gradle"
# Read the current versionCode from build.gradle
current_version_code=$(awk '/defaultConfig {/,/}/' "$BUILD_GRADLE_PATH" | grep "versionCode" | awk '{print $2}')
echo current_version_code is $current_version_code
# Increment the versionCode by one
new_version_code=$((current_version_code + 1))
echo new_version_code is $new_version_code
# Update the build.gradle file with the new versionCode
sed -i '' "s/versionCode $current_version_code/versionCode $new_version_code/" "$BUILD_GRADLE_PATH"
echo "Updated versionCode in $BUILD_GRADLE_PATH to $new_version_code"
echo "Run react-native bundle command to bundle"
# Run react-native bundle command to bundle the JavaScript code
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/build/intermediates/res/merged/release/
echo "Remove existing drawable and raw resources"
# Remove existing drawable and raw resources
rm -rf android/app/src/main/res/drawable-*
rm -rf android/app/src/main/res/raw/*
# Change directory to android/
cd android
echo "In Android directory"
# Clean gradlew before release
echo "ENVFILE=../config/.env.staging ./gradlew clean"
ENVFILE=../config/.env.staging ./gradlew clean
echo "ENVFILE=../config/.env.staging ./gradlew bundleRelease"
# Set environment variable for staging configuration
ENVFILE=../config/.env.staging ./gradlew bundleRelease
# Change directory back to the root directory
cd ..