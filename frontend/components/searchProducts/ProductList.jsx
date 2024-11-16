import { ScrollView, View, StyleSheet } from "react-native";
import Product from "./Product";

const ProductList = ({ filteredProducts, selectProductObject}) => {
  const { setSelectedProduct, setShowDetails } = selectProductObject;
  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.products}>
          {filteredProducts.map((product) => (
            <Product key={product.product_id} product={product} onPress={()=>{handleProductPress(product)}} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "80vh", // Asegura que el contenedor ocupe toda la altura visible
  },
  scrollContent: {
    flexGrow: 1,
  },
  products: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
});

export default ProductList;
