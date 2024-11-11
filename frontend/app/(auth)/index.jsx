import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import FormImput from "../../components/FormInput";
export default function Login(){
    return (
        <View style={styles.background}>
        <View style={styles.container}>
            <View style={styles.form}>
            <Text style={styles.Title}>Identifícate</Text>
            <FormImput placeholder="Correo Electrónico"></FormImput>
            <FormImput secureTextEntry  placeholder="Contraseña"></FormImput>
            <Text style={styles.alertMessage}>  </Text>
            <Pressable style={styles.loginButton}> Iniciar sesión</Pressable>
            <Text style={styles.loginText}> Si no se ha registrado, registrese <Link style={styles.registerLink} href="/register"> aqui </Link></Text>

            </View>
           
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: '#000000',
        fontSize: 12,
        paddingBottom: 20,
    },
    alertMessage: {
        color: '#B10000',
        fontSize: 32,
        
    },
    registerLink: {
        color: '#B10000',
        textDecorationLine: 'underline',
    },
    Title: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    background: {
      backgroundColor: '#929292',
      height: '100%',
      width: '100%',
    },
    container: {
      backgroundColor: '#fff',
      width: '600pt',
      height: '300pt',
        margin: 'auto',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 3,
    },
    loginButton: {
        backgroundColor: '#639CA6',
        color: '#000000',
        padding: 10,
        borderRadius: 8,
        width: '150pt',
        textAlign: 'center',
      },
    form: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',

    }
})