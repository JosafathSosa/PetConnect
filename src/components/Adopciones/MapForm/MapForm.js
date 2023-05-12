import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import MapView, { Marker } from "react-native-maps";
import { Modal } from "../../Shared/Modal";
import { Button } from "@rneui/base";

import { styles } from "./MapForm.styles";
import { Formik } from "formik";

export function MapForm(props) {
  const { show, close, formik } = props;

  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Se necesita permiso para acceder a la localizacion",
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("ubicacion", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <View>
        <MapView
          initialRegion={location}
          showsUserLocation={true}
          style={styles.map}
          onRegionChange={(locationTemp) => setLocation(locationTemp)}
        >
          <Marker draggable coordinate={location} />
        </MapView>

        <View style={styles.mapOptions}>
          <Button
            title="Cerrar"
            containerStyle={styles.mapContainerCancel}
            buttonStyle={styles.mapCancel}
            onPress={close}
          />
          <Button
            title="Guardar ubicacion"
            containerStyle={styles.mapContainerSave}
            buttonStyle={styles.mapSave}
            onPress={saveLocation}
          />
        </View>
      </View>
    </Modal>
  );
}
