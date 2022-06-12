import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BarChart,} from 'react-native-chart-kit';
import LottieView from "lottie-react-native";
import loadings from "../assets/lf30_editor_d4qkobjt.json";

export default function KPICharts({route}) {
    const [data,setData] = useState([])
    const [loading,setloading] = useState(true)
    const url = 'http://192.168.1.6:8000/api'
    useEffect(async()=>{
      await axios.get(`${url}/employees/group-kpi/${route.params?.employee_id}`)
      .then((res)=>{
        setData(res.data.data.valid_kpi)
      })
      setInterval(()=>{
        setloading(false);
      }, 2000)
    },[])
  
    const singleKPI = data?.filter((singleKpi)=>{return singleKpi.id === route.params?.kpi_id})
  
    const fetchedData = {
      labels: singleKPI[0]?.kpi?.map((kpi)=>{return (kpi.updated_at.slice(0,10))}),
      datasets: [
        {
          data: singleKPI[0]?.kpi.map((kpi)=>{return (kpi.rating)}) || [0],
        },
      ],
      barColors: ["#F9E2AE'", "#F3BACD", "#FBC78D", '#85CBCC', '#A7D676' ]
    }
    const screenWidth = Dimensions.get("window").width;
  
    return (
      <>
      {
        loading ?  <View style={styles.container}>
        <LottieView
          style={{
            width: 350,
            height: 350,
          }}
          source={loadings}
          autoPlay
          loop
        />
      </View>: <View style={styles.chartContainer}>
        <Text style={styles.header}>{route.params?.kpi_title}</Text>
        <BarChart
          data={fetchedData}
          verticalLabelRotation={-90}
          xLabelsOffset={60}
          fromZero={true}
          yLabelsOffset={30}
          width={screenWidth - 40}
          height={400}
          chartConfig={{
            backgroundColor: '#32465B',
            backgroundGradientFrom: '#32465B',
            fillShadowGradient:'green',
            fillShadowGradientOpacity:1,
            backgroundGradientTo: '#32465B',
            color: (opacity = 1) => `rgba(0, 300, 300)`,
          }}
          style={{
            marginVertical: 10,
            borderRadius: 16,
            borderColor: 'white',
            borderWidth: 2,
            padding: 10
          }}
        />
      </View>
      }
      </>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    chartContainer:{
      backgroundColor: "#32465B",
      width: '100%',
      height: '100%',
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header:{
      fontSize: 50,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: '#5ED0C1',
    },
  })
  