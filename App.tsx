import React, { useEffect, useState } from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import { Value } from './components/Value';
import {
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

function App(): JSX.Element {
  const [gyroData, setGyroData] = useState({x: 0, y: 0, z: 0});
  const [gyroEnabled, setGyroEnabled] = useState(false);


  setUpdateIntervalForType(SensorTypes.gyroscope, 400);

  useEffect(() => {
    let subscription: any;

    if (gyroEnabled) {
      subscription = gyroscope.subscribe(gyroscopeData => {
        setGyroData(gyroscopeData);
        console.log(gyroData)
      });
    } else {
      subscription?.remove();
    }

    return () => {
      subscription?.remove();
    }
  }, [gyroEnabled])

  const handleGyroToggle = () => {
    setGyroEnabled(!gyroEnabled)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gyroscope Toggle</Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={gyroEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={handleGyroToggle}
          value={gyroEnabled}
          style={styles.switch}
        />
      </View>

      <Text style={styles.headline}>Gyroscope values</Text>
      <Value name="x" value={gyroData.x} />
      <Value name="y" value={gyroData.y} />
      <Value name="z" value={gyroData.z} />
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 80
  },
  switchContainer: {
    marginBottom: 60,
    marginTop: 64
  },
  switch: {
    transform:[{scaleX: 1.5}, {scaleY: 1.5}]
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
