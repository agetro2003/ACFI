import Modal from "../Modal";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Confirmation({ show, setShow, onConfirm }) {
    return (
        <Modal show={show} title="Atencion">
        <View style={styles.container}>
            <Text style={styles.text}>¿Desea realizar el pago?</Text>
            <View style={styles.buttons}>
                <Pressable onPress={onConfirm}>
                    <Text style={styles.button}>Si</Text>
                </Pressable>
                <Pressable onPress={() => setShow(false)}>
                    <Text style={styles.button}>No</Text>
                </Pressable>
            </View>
        </View>
        </Modal>
    );
    }

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginTop: 100,
        fontSize: 24,
        marginBottom: 20,
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 60,
    },
    button: {
        fontSize: 20,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
    },
});