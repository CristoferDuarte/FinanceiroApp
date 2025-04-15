import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import {LineChart} from "react-native-chart-kit";

const HomeScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(1500.0);
  const [transations, setTransations] = useState([
    { id: "1", type: "Receita", category: "Salário", amount: 1500 },
    { id: "2", type: "Despesa", category: "Alimentação", amount: -250 },
    { id: "3", type: "Despesa", category: "Transporte", amount: -300 },
    { id: "4", type: "Despesa", category: "Lazer", amount: -300 },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>
        <Text style={styles.category}>{item.category}</Text> - {item.type}:{" "}
        <Text style={item.amount < 0 ? styles.expense : styles.income}>
          R${item.amount.toFixed(2)}
        </Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Saldo Total */}
      <Text style={styles.balanceText}>Saldo Total: R${balance.toFixed(2)}</Text>
      {/* Grafico */}
      <LineChart
       data= {{
        labels:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago"],
        datasets:[
          {data:[1500,1300,1250,1600,1332,1800,1400,1290]}
        ]
       }}
       width = {Dimensions.get("window").width-20}
       height = {200}
       yAxisLabel = "R$"
       chartConfig={{
        backgroundGradientFrom:"#fff",
        backgroundGradientTo:"#fff",
        decimalPlaces:2,
        color: (opacity = 1) => `rgba(50, 100, 50, ${opacity})`,
       }}
       style = {styles.chart}
      />



      {/* Lista de transações com FlatList */}
      <FlatList
        data={transations}  
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  balanceText: {
    textAlign: "center",
    fontSize: 17,
    marginBottom: 20,
  },
  transactionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionText: {
    fontSize: 16,
  },
  category: {
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
  chart: {
    borderRadius:15,
    marginVertical:20,
  }
});

export default HomeScreen;