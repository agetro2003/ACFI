import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import Modal from "../Modal";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { api } from "../../api/axios";

export default function DetailedProduct({ product, show, setShow }) {
    const [quantity, setQuantity] = useState(1);
    const addToCart = async () => {
        if ( quantity === 0){
            alert("Debes añadir al menos una unidad del producto al carrito");
            return;
        }
        if(api.defaults.headers.common["Authorization"] === undefined){
            alert("Debes iniciar sesión para añadir productos al carrito");
            return;
        }
        try{
        const res = await api.get("/cart");
        const cart = res.data.data;
        const productIndex = cart.findIndex((cartProduct) => cartProduct.cart_product === product.product_id);
        console.log(productIndex);
        if(productIndex !== -1){
            cart[productIndex].cart_quantity += quantity;
            await api.put("/cart", {product_id: cart[productIndex].cart_product, quantity: cart[productIndex].cart_quantity });
        } else {
            await api.post("/cart", {
                product_id: product.product_id,
                quantity: quantity,
            });
        }
        alert(`${quantity} Unidades del producto ${product.product_name} añadido al carrito`);
    } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }
    const handler = () => {
        setShow(false);
    }

    return (
        <Modal title={product.product_category} show={show}>
            <Pressable  onPress={handler} style={styles.return}>
                <Image
                    style={styles.image}
                    source={require("@/assets/images/returnIcon.png")}
                ></Image>
            </Pressable>
            <View>
                <Image
                    style={styles.productImage}
                    source={{ uri: "../../assets/images/producto.png" }}
                ></Image>
                <Text style={styles.product_name}>{product.product_name}</Text>
                <Text style={styles.product_description} >{product.product_description}</Text>

                <View style={styles.priceQuantity}>
                    <Text style={styles.price}>{product.product_price * quantity} €</Text>
                    <View style={styles.addRemove}>
                <Pressable style={styles.addButton} onPress={() => setQuantity(quantity + 1) } >
                 <Text style={styles.addRemoveText}>+</Text>   
                 </Pressable>
                <Text>{quantity}</Text>
                <Pressable style={styles.removeButton} onPress={() =>(quantity > 0) ?  setQuantity(quantity - 1) : setQuantity(0)} >
                 <Text style={styles.addRemoveText}>-</Text>   
                 </Pressable>
            </View>
                </View>
                <Pressable onPress={async()=>await addToCart() } style={styles.addToCart}><FontAwesome5 name="cart-plus" size={20} color="black" /></Pressable>

            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
    },
    productImage: {
        width: 200,
        height: 280,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "black",
        marginLeft: 20,
        borderRadius: 5
    },
    return: {
        position: "absolute",
        top: 10,
        left: 30,
        zIndex: 1,
    },
    product_name: {
        fontSize: 24,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        width: "60%",
        position: "absolute",
        left: 250,
        marginTop: 20,
    },
    product_description: {
        fontSize: 16,
        width: "60%",
        position: "absolute",
        left: 250,
        marginTop: 60,
    },
    addRemove: {
        width: "80pt",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
    } ,
    addButton: {
        width: "20pt",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "black",
    },
    removeButton: {
        width: "20pt",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderLeftWidth: 1,
        borderColor: "black",
    },
    addRemoveText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    addToCart: {
        width: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        position: "absolute",
        left: 600,
        top: 250,
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
    },
    priceQuantity: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "20%",
        flexDirection: "row",
        position: "absolute",
        left: 600,
        top: 160,
    },
    
})