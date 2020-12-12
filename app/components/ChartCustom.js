import { colors } from "@app/constants/Theme";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { scale } from "react-native-size-matters";
const ChartCustom = () => {
  return (
    <PieChart
      data={[
        {
          name: "Phim",
          population: 200,
          color: colors.drankRedChart,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: "Đồ uống",
          population: 366,
          color: colors.drankBlueChart,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ]}
      width={Dimensions.get("window").width}
      height={scale(220)}
      chartConfig={{
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft={scale(15)}
      absolute
    />
  );
};

export default ChartCustom;

const styles = StyleSheet.create({});
