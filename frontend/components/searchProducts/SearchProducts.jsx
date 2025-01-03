import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import Slider from '@react-native-community/slider';
import ProductList from "./ProductList";
import { api } from "../../api/axios";

export default function SearchProducts({ search, selectedCategory, selectedProductObject }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10);
    const [products, setProducts] = useState([])

    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                setProducts(res.data.data);
                setFilteredProducts(res.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts();
    }, []);
    const combinedFilters = products.filter((product) => {
        const matchesPrice = 
            product.product_price >= minPrice && product.product_price <= maxPrice;
        const matchesName = 
            search === "" || product.product_name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = 
            selectedCategory === "" || product.product_category === selectedCategory;

        return matchesPrice && matchesName && matchesCategory;
    });

    useEffect(() => {
        setFilteredProducts(combinedFilters);
    }, [products, minPrice, maxPrice, search, selectedCategory]);

    return (
    <View style={style.container}>
    <View style={style.rangefilter}>
        <Text style ={ style.rangeText }>Precio Minimo: {minPrice}</Text>
        <Slider 
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={10}
        value={minPrice}
        onValueChange={(value) => setMinPrice(value)}
        step={1}
        />
        <Text style ={ style.rangeText }>Precio Maximo: {maxPrice}</Text>
        <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={10}
        value={maxPrice}
        onValueChange={(value) => setMaxPrice(value)}
        step={1}
        />
    </View>
  {/*  <View style={style.products}>
      {filteredProducts.map((product) => (
        <Product key={product.product_id} product={product} />
      ))}
    </View>*/}
    <ProductList filteredProducts={filteredProducts} selectProductObject={selectedProductObject} />
        </View>
  );
}

const style = StyleSheet.create({
    rangeText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",        
        padding: 10,
        height: "90vh",
        width: "100%",
    },
    rangefilter: {
        height: "90%",
        width: "25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    products: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
        width: "75%",
        height: "100%",
    },
    });