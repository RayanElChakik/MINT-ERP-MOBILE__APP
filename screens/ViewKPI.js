import React, {useEffect,useState} from 'react'
import {StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios'
import Star from 'react-native-star-view'
import LottieView from "lottie-react-native";
import loadings from "../assets/lf30_editor_d4qkobjt.json";

export default function ViewKPI({ navigation }) {
  const url = 'http://192.168.1.6:8000/api'
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [employee_id,setEmployeeId] = useState('')
    const [valid_kpi,setValidKpi] = useState([])
    const [employees,setEmployees] = useState([])
    const [cardId,setCardId] = useState('')
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    
    const starStyle = {
      width: 270,
      height: 50,
      marginBottom: 20,
    };
  
    const getAllEmployees = async()=>{
          await axios.get(`${url}/employees`)
      .then((res)=>{
          setEmployees(res.data.data)
      }).catch((err)=>{
          console.log(err);
      })
    }
  
    const getValidKpis = async () =>{
        await axios.get(`${url}/employees/valid-kpi/${employee_id}`)
        .then((res)=>{
          setValidKpi(res.data.data.valid_kpi)
        })
    }
  
    const getGroupedKpis = async () =>{
        await axios.get(`${url}/employees/group-kpi/${employee_id}`)
        .then((res)=>{
            setData(res.data.data.valid_kpi)
        })
    }


    useEffect(()=>{
        getAllEmployees()
        getValidKpis()
        getGroupedKpis()
        setInterval(()=>{
          setLoading(false);
        }, 2000)
  },[employee_id,cardId])
    
    const employessList = employees.map((opt)=>({label:opt.full_name, value:opt.id}))
    const singleKPI = data.filter((singleKpi)=>{return singleKpi.id === cardId})
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
      </View> : <ScrollView 
        style={styles.dropdownContainer}
        contentContainerStyle={{
            alignItems: 'center'
        }}
        >
        <View style={styles.viewContainer}>
          <DropDownPicker
          placeholder="Select an employee..."
        open={open}
        value={value}
        items={employessList}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setEmployees}
        onSelectItem={(value) => {setEmployeeId(value.value);}}
        autoScroll={true}
        containerStyle={{
            width: 300,
            marginTop: 20,
      }}
        style={{
          backgroundColor: "white",
          height: 60,
        }} // for the over all dropdown menu style
        labelStyle={{
          fontWeight: "bold",
          color:'#32465B',
          backgroundColor: 'white',
          height: 30,
          fontSize: 18,
          paddingTop: 6,
          padding: 20,
          alignItems: 'center',
          textAlign: 'center'
        }} // for the labeling style
      />
        {
            valid_kpi.map((kpi)=>{
                return (
                  <TouchableHighlight
                  onPress={() =>
                    navigation.navigate('KPI Charts', {kpi_id: kpi.id, employee_id: employee_id, kpi_title:kpi.kpi_title})
                }
                  key={kpi.id}> 
                  <View style={styles.starContainer}>
                  <Text style={styles.starTitle}>{kpi.kpi_title}</Text>
                  <Star 
                  score={kpi.latest_kpi?.rating} 
                  style={starStyle}
                  />
                </View>
                  </TouchableHighlight>
                )
            })
        }
        </View>
        </ScrollView> 
      }
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
      dropdownContainer:{
          backgroundColor: "#32465B",
          width: '100%',
          height: '100%',
          margin: 0,
      },
      starContainer: {
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          marginTop: 30,
          borderRadius: 20
      },
      starTitle:{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#32465B'
  
      }
  })
  