import { View, Text, StyleSheet, Pressable } from "react-native";

import Login from "../../components/auth/login";
import Register from "../../components/auth/register";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SearchProducts from "../../components/searchProducts/SearchProducts";
import Cart from "../../components/cart/Cart";
import { api } from "../../api/axios";
import DetailedProduct from "../../components/searchProducts/DetailedProduct";


export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [background, setBackground] = useState("#929292");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  console;
  // change the background color of the page when a modal is open
  useEffect(() => {
    if (showLogin || showRegister || showDetails) {
      setBackground("#929292");
    } else {
      setBackground("#ffffff");
    }
  }, [showLogin, showRegister, showDetails]);
  const styles = StyleSheet.create({
    background: {
      backgroundColor: background,
      height: "100%",
      width: "100%",
    },
  });

  return (
    <View style={styles.background}>
      <NavBar
        setLogin={setShowLogin}
        Showlogin={showLogin}
        setSearch={setSearch}
        setCategory={setSelectedCategory}
        showCart={showCart}
        setShowCart={setShowCart}
        setRegister={setShowRegister}
        ShowRegister={showRegister}
      />
      <View>
      
        <Login
          show={showLogin}
          setRegister={setShowRegister}
          setShow={setShowLogin}
        />
        <Register
          show={showRegister}
          setLogin={setShowLogin}
          setShow={setShowRegister}
        />
          <DetailedProduct
        product={selectedProduct}
        show={showDetails}
        setShow={setShowDetails}
      />

        {
        showCart 
        ? 
        (
        api.defaults.headers.common["Authorization"] === undefined ?
        <Text style={styles.alerta}>Debes iniciar sesión para ver el carrito de compras</Text>
        :
        <Cart />) 
      :
      <SearchProducts search={search} selectedCategory={selectedCategory} selectedProductObject={{setShowDetails, setSelectedProduct}} />

      }
       
     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alerta: {
    color: "#B10000",
    fontSize: 32,
  },
});