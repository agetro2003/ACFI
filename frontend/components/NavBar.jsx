import { useEffect, useState } from "react";
import { Button, View, StyleSheet, TextInput, Pressable, Image } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from '@expo/vector-icons/Ionicons';
import { api } from "../api/axios";
import Entypo from '@expo/vector-icons/Entypo';
/* navbar component with:
Select para categorias
Input para buscar productos
Boton para buscar
Boton para ver carrito
una barra separadora
Boton icono para iniciar sesion
Boton icono para carrito

*/


export default function NavBar({setLogin, Showlogin, setSearch, setCategory, setShowCart, showCart, setRegister, ShowRegister, setShowLogout}) {
  const [categorias, setCategorias] = useState([]);
  const [cartColor, setCartColor] = useState("black");
  const [accountColor, setAccountColor] = useState("black");
  const [globeColor, setGlobeColor] = useState("black");
  
  useEffect(() => {
   
    const fetchCategories = async () => {
      try{
      const res = await api.get("/categories");
      setCategorias(res.data.data);
    } catch(error) {
      console.error("Error fetching categories:", error);
    }
  }
    fetchCategories();
   
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Pressable onPress={() => {setShowCart(false)}}>
        <Image  source={{uri: "../../assets/images/producto.png"}} style={{width: 100, height: 50}} />
        </Pressable>
        <select onChange={e => {
          setCategory(e.target.value);
        }} placeholder="Categoría" defaultValue="" style={styles.catagorias}>
            <option value="">Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.category_name} value={categoria.category_name}>{categoria.category_name}</option>
          ))}
        </select>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Buscar productos"
            onChangeText={(text) => {
              setSearch( text );
            }}
            underlineColorAndroid="transparent"
          />
            <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />

        </View>
      </View>
      <View style={styles.right}>
        <Pressable
            onHoverIn={() => {
                setGlobeColor("blue");
            }}
            onHoverOut={() => {
                setGlobeColor("black");
            }}
            >
                <Ionicons name="globe-sharp" size={24} color={globeColor} />
            </Pressable>
        <Pressable
        onPress={() => {
            if(api.defaults.headers.common["Authorization"]){
                setShowLogout(true);
            } else {
            setLogin( ShowRegister ? false : !Showlogin);
            setRegister(ShowRegister ? false : ShowRegister);
            }
        }
        }
          onHoverIn={() => {
            setAccountColor("blue");
          }}
          onHoverOut={() => {
            setAccountColor("black");
          }}
        >
          { api.defaults.headers.common["Authorization"] ?
          <Entypo name="log-out" size={24} color="black" />
          :
          <MaterialCommunityIcons
            name="account-settings"
            size={24}
            color={accountColor}
          />
          }
          
          
        </Pressable>
        <Pressable
          onHoverIn={() => {
            setCartColor("blue");
          }}
          onHoverOut={() => {
            setCartColor("black");
          }}
          onPress={() => {
            setShowCart(true);
          }}
        >
          <Foundation name="shopping-cart" size={24} color={cartColor} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    catagorias: {
        width: "120pt",
        height: "40pt",
        borderColor: "transparent",
        borderWidth: 1,
        backgroundColor: "transparent",
        color: "black",
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 20,
        marginRight: 20,
      },
  container: {
    backgroundColor: "D9D9D9",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    width: "200pt",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderLeftColor: "black",
    borderLeftWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1,
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 20,
    marginRight: 20,
},
searchIcon: {
    position: 'relative',
    left: -50,
    padding: 10,
    backgroundColor: '000000',
    marginRight: 10,
    alignSelf:'flex-start'
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    width: "600pt",
    
},
});
