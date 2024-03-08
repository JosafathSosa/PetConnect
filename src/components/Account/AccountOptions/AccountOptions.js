import React, { useState } from "react";
import { View, Text } from "react-native";
import { ListItem, Icon, Button } from "@rneui/base";
import { map } from "lodash";
import { Modal } from "../../Shared/Modal";
import { screen } from "../../../utils/screenName";
import { useNavigation } from "@react-navigation/native";

import { ChangeUserName } from "../ChangeUserName";
import { ChangeUserPass } from "../ChangeUserPass";

export function AccountOptions(props) {
  const { recargando } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderModal, setRenderModal] = useState(null);

  const abrirCerrarModal = () => setShowModal((prevState) => !prevState);

  const navigation = useNavigation();

  const goAdoptions = () => {
    navigation.navigate(screen.cuenta.adoptions);
  };

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderModal(
        <ChangeUserName onClose={abrirCerrarModal} onReload={recargando} />
      );
    }
    if (key === "changePass") {
      setRenderModal(
        <ChangeUserPass onClose={abrirCerrarModal} onReload={recargando} />
      );
    }
    abrirCerrarModal();
  };

  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View>
      <Button
        title="Mis mascotas"
        containerStyle={{
          marginBottom: 30,
          marginHorizontal: 80,
          backgroundColor: "orange",
          borderRadius: 10,
        }}
        buttonStyle={{ backgroundColor: "orange" }}
        onPress={goAdoptions}
      />
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          bottomDivider
          topDivider
          containerStyle={{ backgroundColor: "#F2F3F4" }}
          onPress={menu.onPress}
        >
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}

      <Modal show={showModal} close={abrirCerrarModal}>
        {renderModal}
      </Modal>
    </View>
  );
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Cambiar nombre y apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "key",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("changePass"),
    },
  ];
}
