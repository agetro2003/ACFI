import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import FormImput from "../FormInput";
import Modal from "../Modal";
export default function Login({show, setRegister, setShow}) {
  const handler = () => {
    setRegister(true);
    setShow(false);
  };
  return (
      <Modal title="Identifícate" show={show}>
        <View style={styles.form}>
          <FormImput placeholder="Correo Electrónico"></FormImput>
          <FormImput secureTextEntry placeholder="Contraseña"></FormImput>
          <Text style={styles.alertMessage}> </Text>
          <Pressable style={styles.loginButton} onPress={handler}>
            <Text>Iniciar sesión</Text>
          </Pressable>
          <Text style={styles.loginText}>
            Si no se ha registrado, registrese{" "}
            <Text style={styles.registerLink} onPress={handler}>
            aqui
            </Text>
          </Text>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  loginText: {
    color: "#000000",
    fontSize: 12,
    paddingBottom: 20,
  },
  alertMessage: {
    color: "#B10000",
    fontSize: 32,
  },
  registerLink: {
    color: "#B10000",
    textDecorationLine: "underline",
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
    width: "150pt",
    textAlign: "center",
  },
  form: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
