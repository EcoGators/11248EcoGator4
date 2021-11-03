import React from 'react';
import { StyleSheet, View } from "react-native";
import base from './styles/base';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

interface IProfileProps {}

const Chart: React.FunctionComponent<IProfileProps> = (props) => {
  return (
    <View style={base.centered}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
    </View>
  );
};
export default Chart;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });