import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "@rneui/base";

import { styles } from "./LoadingModal.styles";

export function LoadingModal(props) {
  const { show, text } = props;
  return (
    <Overlay
      isVisible={show}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="white" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModal.defaultProps = {
  show: false,
};
