import { View, Text, StyleSheet, Pressable } from "react-native"

import Login from "../../components/auth/login"
import Register from "../../components/auth/register"
import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"


export default function Home(){
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [background, setBackground] = useState('#929292')

// change the background color of the page when a modal is open 
    useEffect(() => {
        if(showLogin || showRegister){
            setBackground('#929292')
        }else{
            setBackground('#ffffff')
        }
    }, [showLogin, showRegister])
    const styles = StyleSheet.create({
        background: {
            backgroundColor: background,
            height: '100%',
            width: '100%',
        },
    })
    
    return (
        <View style={styles.background}>
             <NavBar setLogin={setShowLogin} Showlogin={showLogin}/>
            <View> 
               <Login show={showLogin} setRegister={setShowRegister} setShow={setShowLogin}/>
               <Register show={showRegister} setLogin={setShowLogin} setShow={setShowRegister}/>
            </View>
        </View>
    )
}

