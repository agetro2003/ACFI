import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import FormImput from "../FormInput";
import Modal from "../Modal";
import { api, authApi } from "../../api/axios";
import { useState } from "react";

export default function Register({show, setShow, setLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [name , setName] = useState("");

  const handlerRegister = async () => {
    if (password !== confirmPassword) {
      setAlertMessage("Las contraseñas no coinciden");
      return;
    }
    try {
      const res = await authApi.post("/register", {
        user_email: email,
        user_password: password,
        user_name: name
      });
      const res2 = await authApi.post("/login", {
        user_email: email,
        user_password: password,
      });
      const token = res2.data.data.token;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAlertMessage("Registro exitoso");
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage("El correo electrónico ya está en uso");
      }else {
      setAlertMessage(error.response.data.message);
    }
  }
  };
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
          <FormImput onChange={(e)=>{setEmail(e.target.value)}} placeholder="Correo Electrónico"></FormImput>
          <FormImput onChange={(e)=>{setPassword(e.target.value)}} secureTextEntry placeholder="Contraseña"></FormImput>
          <FormImput
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            secureTextEntry
            placeholder="Confirmar Contraseña"
          ></FormImput>
          <FormImput onChange={(e)=>{setName(e.target.value)}} placeholder="Nombre"></FormImput>
          <Text style={styles.alertMessage}> {alertMessage} </Text>
          <Pressable onPress={async()=>{handlerRegister()}} style={styles.loginButton}><Text style={styles.text_center}>Registrar</Text></Pressable>
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
  text_center: {
    textAlign: "center"
  }
});
