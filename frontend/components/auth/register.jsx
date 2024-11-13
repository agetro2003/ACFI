import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import FormImput from "../FormInput";
import Modal from "../Modal";

export default function Register({show, setShow, setLogin}) {
  const handler = () => {
    setShow(false);
    setLogin(true);
  }

  return (
      <Modal title="Crear una cuenta" show={show}>
        <Pressable style={styles.imageLink} onPress={handler}>
          <Image
            style={styles.image}
            source={require("@/assets/images/returnIcon.png")}
          ></Image>
        </Pressable>
        <View style={styles.form}>
          <FormImput placeholder="Correo Electrónico"></FormImput>
          <FormImput secureTextEntry placeholder="Contraseña"></FormImput>
          <FormImput
            secureTextEntry
            placeholder="Confirmar Contraseña"
          ></FormImput>
          <FormImput placeholder="Nombre"></FormImput>
          <Text style={styles.alertMessage}> </Text>
          <Pressable style={styles.loginButton}><Text>Registrar</Text></Pressable>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  imageLink: {
    position: "absolute",
    top: 10,
    left: 30,
    zIndex: 1,
  },
  image: {
    width: 40,
    height: 40,
  },
  alertMessage: {
    color: "#B10000",
    fontSize: 32,
  },
  Title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  background: {
    backgroundColor: "#929292",
    height: "100%",
    width: "100%",
  },
  container: {
    backgroundColor: "#fff",
    width: "600pt",
    height: "300pt",
    margin: "auto",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
  },
  loginButton: {
    backgroundColor: "#639CA6",
    color: "#000000",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: "150pt",
    textAlign: "center",
  },
  form: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
