import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { api } from "../../api/axios";
/* Component to show product it has
    - product image
    - product name
    - product price and two buttons one for add one for remove 
    - a button to add to cart
*/
export default function Product({ product, onPress }) {

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
const [quantity, setQuantity] = useState(1);
return (
    <View style={style.container}>
        <Pressable onPress={onPress}>
        <Image source={{uri: "../../assets/images/producto.png"}} style={style.image} />  
        </Pressable> 
        <Text style={style.product_name}>{product.product_name}</Text>
        <View style={style.priceQuantity}>
           <Text style={style.price}>{product.product_price} €</Text>
            <View style={style.addRemove}>
                <Pressable style={style.addButton} onPress={() => setQuantity(quantity + 1) } >
                 <Text style={style.addRemoveText}>+</Text>   
                 </Pressable>
                <Text>{quantity}</Text>
                <Pressable style={style.removeButton} onPress={() =>(quantity > 0) ?  setQuantity(quantity - 1) : setQuantity(0)} >
                 <Text style={style.addRemoveText}>-</Text>   
                 </Pressable>
            </View>
            
        </View>
        <Pressable style={style.addToCart} onPress={async()=>{await addToCart()}}>
            <FontAwesome5 name="cart-plus" size={20} color="black" />     
            </Pressable>
    </View>
)
}

const style = StyleSheet.create({
container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "black",
    width: "150pt",
    height: "200pt",
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#00FFFF",
},
    image: {
        width: "100pt",
        height: "100pt",
        borderWidth: 1,
        borderColor: "black",
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
    price: {
        fontSize: 20,
        fontWeight: "bold",
    },
    priceQuantity: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
    },
    addRemoveText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    addToCart: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
    },
    product_name: {
        fontSize: 14,
        width: "100%",
    }
});
