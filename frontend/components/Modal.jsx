import { View, Text, StyleSheet } from "react-native";

/* Modal component that receives:
A boolean prop to show or hide the modal 
A Title
A children prop that will be rendered inside the modal
*/
export default function Modal({show, title, children}){
    return (
        <>
            {show && <View style={styles.modal}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                {children}

            </View>}
        </>
    )
}
// Styles for the Modal component

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        width: '600pt',
        height: '300pt',
          margin: 'auto',
          borderRadius: 20,
          borderColor: 'black',
          borderWidth: 3,
          marginTop: 100,
      },
    titleContainer:{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    }

})