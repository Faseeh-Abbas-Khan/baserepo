echo ------------------------------------
echo -------available devices------------
echo ------------------------------------
adb devices

echo ------------------------------------
echo ------Go To Android Directory-------
echo ------------------------------------
cd android

echo ------------------------------------
echo -----------Gradlew Clean------------
echo ------------------------------------
ENVFILE=../config/.env.staging ./gradlew clean


echo ------------------------------------
echo -----------Gradlew Build------------
echo ------------------------------------
ENVFILE=../config/.env.staging ./gradlew build


echo ------------------------------------
echo ---------Building Project-----------
echo ------------------------------------
ENVFILE=./config/.env.staging npx react-native run-android