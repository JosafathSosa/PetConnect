import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./Map.styles";
import openMap from "react-native-open-maps";

export function Map(props) {
  const { location, name } = props;

  const abrirMapa = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };
  return (
    <MapView
      initialRegion={location}
      style={styles.content}
      zoomEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      onPress={abrirMapa}
    >
      <Marker coordinate={location} />
    </MapView>
  );
}
