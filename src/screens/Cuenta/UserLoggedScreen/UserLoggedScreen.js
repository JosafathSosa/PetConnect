import React, { useState } from "react";
import { View, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";

import { Button } from "@rneui/base";
import { styles } from "./UserLoggedScreen.styles";

import { LoadingModal } from "../../../components/Shared/LoadingModal";
import { InfoUser } from "../../../components/Account/InfoUser";
import { AccountOptions } from "../../../components/Account/AccountOptions";

export function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("second");
  const [_, setReload] = useState(false);

  const recargando = () => setReload((prevState) => !prevState);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.content}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions recargando={recargando} />

      <Button
        title="Cerrar sesion"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.textBtn}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
