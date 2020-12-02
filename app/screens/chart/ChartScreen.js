import ScreenComponent from "@app/components/ScreenComponent";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { statisticRequest } from "@app/redux/actions/index";
import { scale } from "react-native-size-matters";
import { colors } from "@app/constants/Theme";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const ChartScreen = () => {
  //call api đơn hàng
  const dispatch = useDispatch();
  const statistic = useSelector(state => state.statisticReducer);
  useEffect(() => {
    dispatch(statisticRequest());
  }, []);
  //LineChart : Thống kê đơn hàng hàng tháng
  //LineChart : Thống kê đơn hàng hàng tháng theo %
  return (
    <ScreenComponent
      titleHeader={"Thống kê"}
      renderView={
        <>
          {/* <LineChart
            data={{
              labels: [
                "T1",
                "T2",
                "T3",
                "T4",
                "T5",
                "T6",
                "T7",
                "T8",
                "T9",
                "T10",
                "T11",
                "T12"
              ],
              datasets: [
                {
                  data: [
                    statistic?.data?.["1"] || 0,
                    statistic.data?.["2"] || 0,
                    statistic.data?.["3"] || 0,
                    statistic.data?.["4"] || 0,
                    statistic.data?.["5"] || 0,
                    statistic.data?.["6"] || 0,
                    statistic.data?.["7"] || 0,
                    statistic.data?.["8"] || 0,
                    statistic.data?.["9"] || 0,
                    statistic.data?.["10"] || 0,
                    statistic.data?.["11"] || 0,
                    statistic.data?.["12"] || 0
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={scale(300)}
            formatYLabel={x => {
              return x;
            }}
            segments={5}
            // yAxisLabel=""
            // yAxisSuffix=""
            // yAxisInterval={1} // optional, defaults to 1z
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          /> */}
          <PieChart
            data={[
              {
                name: "Tháng 1",
                population: 200,
                color: colors.olive,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 2",
                population: 200,
                color: colors.redDrank,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 3",
                population: 300,
                color: colors.blueSea,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 4",
                population: 150,
                color: "red",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 5",
                population: 203,
                color: "#000",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 6",
                population: 125,
                color: colors.primaryDark1,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 7",
                population: 234,
                color: colors.greySeat,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 8",
                population: 423,
                color: colors.green,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 9",
                population: 654,
                color: colors.purpleLight,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 10",
                population: 234,
                color: colors.blue,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 11",
                population: 342,
                color: colors.tomato,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Tháng 12",
                population: 234,
                color: colors.active,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              }
            ]}
            width={Dimensions.get("window").width}
            height={scale(250)}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
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
            // absolute
          />
        </>
      }
    />
  );
};

export default ChartScreen;

const styles = StyleSheet.create({});
