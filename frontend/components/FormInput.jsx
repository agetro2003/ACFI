import { TextInput, StyleSheet } from "react-native";
export default function FormImput({placeholder, secureTextEntry, onChange}){
    return (
        <TextInput textContentType="emailAddress" onChange={onChange} placeholder={placeholder} secureTextEntry={secureTextEntry} style={styles.input}></TextInput>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '300pt',
        backgroundColor: '#D9D9D9',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    }
})

