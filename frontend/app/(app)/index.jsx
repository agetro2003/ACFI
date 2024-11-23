import { View, Text, StyleSheet, Pressable } from "react-native";

import Login from "../../components/auth/login";
import Register from "../../components/auth/register";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SearchProducts from "../../components/searchProducts/SearchProducts";
import Cart from "../../components/cart/Cart";
import { api } from "../../api/axios";
import DetailedProduct from "../../components/searchProducts/DetailedProduct";
import Logout from "../../components/auth/logout";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showLogout, setShowLogout] = useState(false);

 /* const [background, setBackground] = useState("#ffffff");

  useEffect(() => {
    if (showLogin || showRegister || showDetails) {
      setBackground("#929292");
    } else {
      setBackground("#ffffff");
    }
  }, [showLogin, showRegister, showDetails]);
*/
  const styles = StyleSheet.create({
    background: {
      backgroundColor: "#ffffff",
      height: "100%",
      width: "100%",
    },
    modalOverlay: {
      cursor: "default",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1, // Asegura que el fondo cubra todo
    },
    alerta: {
      color: "#B10000",
      fontSize: 32,
    },
  });

  return (
    <View>
      <View style={styles.background}>
        {/* Modal Overlay */}
        {(showLogin || showRegister || showDetails) && (
          <Pressable
            style={styles.modalOverlay}
            onPress={() => {
              setShowLogin(false);
              setShowRegister(false);
              setShowDetails(false);
            }}
          >
            {/* Empty pressable area for closing modal */}
          </Pressable>
        )}
      <NavBar
        setLogin={setShowLogin}
        Showlogin={showLogin}
        setSearch={setSearch}
        setCategory={setSelectedCategory}
        showCart={showCart}
        setShowCart={setShowCart}
        setRegister={setShowRegister}
        ShowRegister={showRegister}
        setShowLogout={setShowLogout}
      />

        {/* Modals */}
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
        <Logout show={showLogout} setShow={setShowLogout} onConfirm={
          () => {
            api.defaults.headers.common["Authorization"] = undefined;
            setShowLogout(false);
          }
        }/>

        {/* Main Content */}
        {showCart ? (
          api.defaults.headers.common["Authorization"] === undefined ? (
            <Text style={styles.alerta}>
              Debes iniciar sesión para ver el carrito de compras
            </Text>
          ) : (
            <Cart />
          )
        ) : (
          <SearchProducts
            search={search}
            selectedCategory={selectedCategory}
            selectedProductObject={{ setShowDetails, setSelectedProduct }}
          />
        )}
      </View>
    </View>
  );
}
