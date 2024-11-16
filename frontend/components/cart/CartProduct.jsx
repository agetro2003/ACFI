import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { api } from "../../api/axios";

export default function CartProduct({ product, setCart, cart}) {
  const deleteProduct = async () => {
    try {
      await api.delete("/cart", { product_id: product.cart_product  });
      const newCart = cart.filter((cartProduct) => cartProduct.cart_product !== product.cart_product);
      console.log(newCart);
      setCart(newCart);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
  const addOne = () =>{
    const newCart = cart.map((cartProduct) => {
      if(cartProduct.cart_product === product.cart_product){
        cartProduct.cart_quantity += 1;
      }
      return cartProduct;
    });
    setCart(newCart);
  }

  const removeOne = () =>{
    const newCart = cart.map((cartProduct) => {
      if(cartProduct.cart_product === product.cart_product){
        cartProduct.cart_quantity -= 1;
      }
      return cartProduct;
    });
    setCart(newCart);
  }



  return (
    <View style={style.product}>
      <View style={style.leftProduct}>
        <Image
          source={{ uri: "../../assets/images/producto.png" }}
          style={style.image}
        />
        <Text style={style.text}>{product.product_name}</Text>
      </View>
      <View style={style.rightProduct}>
        <Text style={style.text}> {Number(product.product_price).toFixed(2)} €</Text>
        <View style={style.quantity}>
          <Pressable
          onPress={removeOne}
          >
            <Text style={style.text}>-</Text>
          </Pressable>
          <Text style={style.text}>{product.cart_quantity}</Text>
          <Pressable 
          onPress={addOne}
          >
            <Text style={style.text}>+</Text>
          </Pressable>
        </View>
        <View style={style.deleteAndPrice}>
          <Text style={style.text}>
            {(product.product_price * product.cart_quantity).toFixed(2)} €
          </Text>
          <Pressable style={style.delete} 
          onPress={deleteProduct}
          >
            <FontAwesome5 name="trash-alt" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    width: "50pt",
    height: "50pt",
    borderWidth: 1,
    borderColor: "black",
    marginRight: 30,
  },
  product: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftProduct: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
  },
  rightProduct: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50pt",
  },
  deleteAndPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },    
   delete: {
    marginLeft: 45,
   }
});
