
    /* Pestaña para el carrito de compras
Tabla de productos en el carrito de compras con 
columnas para la imagen, nombre, precio por unidad, cantidad (junto a botones para agregar o eliminar), precio total y botón para eliminar el producto del carrito
Despues abajo de la tabla se debe mostrar el precio total de la compra y mas abajo un botón para finalizar la compra
*/ 
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import CartProduct from "./CartProduct";
import { api } from "../../api/axios";
import Confirmation from "./Confirmation";
export default function Cart () {
    const [cart, setCart] = useState([]);
    const [dbCart, setDbCart] = useState([]);
    const [price, setPrice] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const updateBeforeDelete = async () => {
        try {
             for (let i = 0; i < dbCart.length; i++) {
            if (dbCart[i].cart_quantity !== cart[i].cart_quantity) {
                await api.put("/cart", {
                    product_id: dbCart[i].cart_product,
                    quantity: cart[i].cart_quantity,
                });
            }
        }
        } catch (error) {
            console.error("Error updating cart:", error);
        }
       
    }
    const onCheckout = async () => {
        try {
          await updateBeforeDelete();
          await api.delete("/cart/clear");
          setCart([]);
          setConfirm(false);
          alert("Compra realizada con éxito");
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      }
    const getTotalPrice = (cartProducts) => {
        let total = 0;
        console.log(cartProducts);
        cartProducts.forEach((product) => {
            total += product.product_price * product.cart_quantity;
        });
        console.log(total);
        setPrice(total.toFixed(2));
    };
    const fetchCart = async () => {
        try {
            const res = await api.get("/cart");
            setDbCart(res.data.data);
            setCart(res.data.data);
            getTotalPrice(res.data.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        getTotalPrice(cart);
    }, [cart]);


    return(
        <View>
            {
                !confirm 
                ?
                <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Producto</Text>
                    </View>
                    <View style= {styles.rightHeader}>
                        <Text style={styles.headerText}>Precio/Unidad</Text>
                        <Text style={styles.headerText}>Cantidad</Text>
                        <Text style={styles.headerText}>Precio Total</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {cart.map((product) => (
                        <CartProduct key={product.cart_product} product={product} setCart={setCart} cart={cart} />
                ))    
                    }
                </ScrollView>
            
                <View style={styles.checkout}>
                    <View style={styles.totalView}>
                        <Text style={styles.total}>Total:</Text>
                        <Text style={styles.total}>{price} €</Text>
                    </View>
                    <Pressable style={styles.checkoutButton} onPress={()=>{setConfirm(true)}}>
                        <Ionicons name="bag-remove-outline" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
            :
            <Confirmation setShow={setConfirm} show={confirm} onConfirm={onCheckout} />

            }
       
        </View>
            
            )
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        width: "93%",
        maxHeight: "80vh",
        padding: 40,
        marginTop: 40,
        margin: "auto",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 10,
    },
    rightHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "400pt",
        paddingRight: 80,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    totalView: {
        width: "20%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 10,
    },
    total: {
        fontSize: 24,
        fontWeight: "bold",
    },
    checkout: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: 20,
        borderTopWidth: 1,
        paddingTop: 10,
        borderTopColor: "black",
    },
    checkoutButton: {
        borderWidth: 1,
        borderColor: "black",
        width: "20%",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
})