import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TextInput, Button, ScrollView} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Rating from './Rating'
import LottieView from "lottie-react-native";
import loadings from "../assets/lf30_editor_d4qkobjt.json";
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-root-toast';

export default function EvaluateKPI() {
    const url = 'http://192.168.1.6:8000/api'
    const [kpi,setKpi] = useState([])
    const [employee_id,setEmployeeId] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [employees,setEmployees] = useState([])
    const [loading,setLoading] = useState(true)
    const [count,setCount] = useState(null)
    const [kpi_title,setKpiTitle] = useState('')
    const  onStarRatingPress = (rating) => {
      setCount(rating)
    }
    
    const getAllEmployees = async()=>{
        await axios.get(`${url}/employees`)
        .then((res)=>{
            setEmployees(res.data.data);
        }).catch((err)=>{
        })
    }
    
    const getAllKpi = async() =>{
        await axios.get(`${url}/kpis`)
        .then((res)=>{
            setKpi(res.data.data)
        })
    }
    useEffect(()=>{
        getAllEmployees()
        getAllKpi()
        setInterval(()=>{
            setLoading(false);
          }, 2000)
    },[])

    const employeesList = employees.map((opt)=>({label:opt.full_name, value:opt.id}));
    const renderItem = ({ item }) => (
        <TouchableHighlight onPress={()=>{console.log(item.id);}} onPress={()=>{console.log(item.id);}}>
        <View style={styles.kpiContainer} key={item.id} >
        <Text style={styles.KpiName}>{item.kpi_title}</Text>
        <Rating  kpi_id={item.id} employee_id={employee_id} />
        </View>
        </TouchableHighlight>
        );  

    const addKpi = async () =>{
        let data={
            kpi_title,
            employee_id,
            rating: count
        }
        await axios.post(`${url}/kpis`,data)
        .then(()=>{
            Toast.show('KPI has been added',{
                duration: Toast.durations.LONG,
                position: 100,
                backgroundColor: '#32465B',
                textColor: 'white',
                animation: true,
                containerStyle: {
                  padding: 10,
                  width: 300,
                  height: 50,
                  },
                  textStyle:{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }
              });
            setKpiTitle('')
            getAllKpi()
            setCount(null)
        })
    }
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
          </View> :
             <ScrollView style={styles.homeContainer}>
             <View style={{alignItems: 'center', marginTop: 120}}>
                 <DropDownPicker
                 placeholder="Select an employee..."
                 open={open}
                 value={value}
                 items={employeesList}
                 setOpen={setOpen}
                 setValue={setValue}
                 setItems={setEmployees}
                 onSelectItem={(value) => {setEmployeeId(value.value);}}
                 autoScroll={true}
                 containerStyle={{
                     width: 300,
                     marginTop: -80,
                     marginBottom: -50,
                     height: 120
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
                     textAlign: 'center',
                 }} // for the labeling style
                 />
             <TouchableHighlight style={styles.primaryContainer}>
                 <View style={styles.addKpi}>
                     <Text>Enter Kpi Name </Text>
                     <TextInput 
                     placeholder="Please enter KPI Name..."
                     onChangeText={(val)=>{setKpiTitle(val)}}
                     style={styles.inputField}
                     value={kpi_title}
                     />
                 <StarRating
                     disabled={false}
                     emptyStar={'ios-star-outline'}
                     fullStar={'ios-star'}
                     iconSet={'Ionicons'}
                     maxStars={5}
                     rating={count}
                     selectedStar={(rating)=>onStarRatingPress(rating)}
                     set
                     fullStarColor={'orange'}
                 />
                 <View style={styles.addButton}>
                     <Button 
                 color='#5ED0C1'
                 title='Add KPI'
                 onPress={addKpi}
                 />
                 </View>
                 </View>
           </TouchableHighlight>
         <View style={styles.primaryContainer}>
             <View style={styles.reportContainer} >
             <FlatList
                 data={kpi}
                 renderItem={renderItem}
                 listKey={item => item.id}
                 keyExtractor={item => item.id}
             />
             </View>
         </View>
         </View>
         </ScrollView>
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
    homeContainer:{
        backgroundColor: "#32465B",
        width: '100%',
        height: '100%',
        margin: 0
    },
    addButton:{
        width: 100,
        backgroundColor:'#32465B',
        marginTop: 10,
        borderRadius: 5
    },
    inputField:{
        borderWidth: 3,
        borderColor: '#5ED0C1',
        marginTop: 10,
        width: 220,
        height: 40,
        paddingLeft: 10,
        fontSize: 16,
    },
    addKpi:{
        backgroundColor: 'white',
        width: 380,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20
    },
    primaryContainer:{
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    kpiContainer:{
        backgroundColor: 'white',
        width: 380,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        borderRadius: 10,
        marginBottom: 20,
    },
    KpiName:{
        fontSize: 20,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#32465B'
    }
})

