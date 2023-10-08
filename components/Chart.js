import React from "react";
import { View, useColorMode, useTheme } from "native-base";
import { StyleSheet } from "react-native";
import { sub } from "date-fns";
import { ScreenWidth, ScreenHeight } from "react-native-elements/dist/helpers";
import { LineChart } from "react-native-wagmi-charts";

const formatUSD = value => {
    'worklet';
    if (value === '') {
      return '';
    }
    return `$ ${value.toLocaleString('en-US', {
      currency: 'USD',
    })}`;
  };
  
const formatDatetime = value => {
    'worklet';
    if (value === '') {
      return '';
    }
    const date = new Date(Number(value * 1000));
    const s = date.getSeconds();
    const m = date.getMinutes();
    const h = date.getHours();
    const d = date.getDate();
    const n = date.getMonth();
    const y = date.getFullYear();
    return `${y}-${n}-${d} ${h}:${m}:${s}`;
};

export default function Chart({chartFigures, percentChange}) {
    const { colorMode} = useColorMode();
    const theme = useTheme()
    return (
        <LineChart.Provider data={chartFigures} style>
        <LineChart width={ScreenWidth - 16} height={ScreenHeight- 650}>
          <LineChart.Path color={colorMode === "dark" ? (percentChange > 0 ? "#69ff8a": "#ff69c3")
          : (percentChange > 0 ? theme.colors.green[700] : theme.colors.red[700])}>
            <LineChart.Gradient color={colorMode === "dark" ? 
            (percentChange > 0 ? theme.colors.green[700] : theme.colors.red[700] ) 
            : (percentChange > 0 ? "#69ff8a": "#ff69c3" ) } />
          </LineChart.Path>
          <LineChart.CursorLine color= {colorMode === "light" ? "black" : "white"} />
          <LineChart.CursorCrosshair color={colorMode === "dark" ? (percentChange > 0 ? "#69ff8a": "#ff69c3") 
          : (percentChange > 0 ? theme.colors.green[700] : theme.colors.red[700])}/>
        </LineChart>
        <View style={{ paddingHorizontal: 2 }}>
          <LineChart.PriceText
            style={{ color: colorMode === "light" ? "black" : "white"}}
            format={({ value }) => {
              "worklet";
              return `$${value} USD`;
            }}
          />
          <LineChart.DatetimeText
            style={{ color: colorMode === "light" ? "black" : "white"}}
            format={({ value }) => {
              "worklet";
              return value;
            }}
            variant="value"
          />
        </View>
      </LineChart.Provider>
  )
}