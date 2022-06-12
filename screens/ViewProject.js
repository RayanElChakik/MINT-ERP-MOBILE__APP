import { View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import LottieView from "lottie-react-native";
import loadings from "../assets/lf30_editor_d4qkobjt.json";


export default function ViewProject() {
    const [report,setReport] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [employee_id,setEmployeeId] = useState('')
    const [employees,setEmployees] = useState([])
    const [loading,setLoading] = useState(true)


    
    const getAllEmployees = async()=>{
        await axios.get('http://192.168.1.6:8000/api/employees')
        .then((res)=>{
            setEmployees(res.data.data);
        }).catch((err)=>{
            console.log(err.message);
        })
    }
    
    const getReports = async ()=>{
        await axios.get(`http://192.168.1.6:8000/api/employees/${employee_id}`)
        .then((res)=>{
            setReport(res.data.data)
        }).catch (err=>{
            console.log(err.message);
        })
    }

    useEffect(async()=>{
        getAllEmployees();
        getReports();
        setInterval(()=>{
            setLoading(false);
          }, 2000)
    },[employee_id])
  const employeesList = employees.map((opt)=>({label:opt.full_name, value:opt.id}));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
      <ScrollView style={styles.ReportProjectContainer}>
        <View style={{alignItems: 'center', marginTop: 120, justifyContent: 'space-evenly'}}>
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
            {report?.project?.map(data=>{
                return(
                <View style={{borderRadius: 15, backgroundColor: '#fff', margin: 30}} key={data.id}>
                    <View style={styles.CardsContainer}>
                        <View style={styles.key}>
                            <Text style={styles.keyText}>Project Name</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={{
                                color: '#6C7A89'
                                }}
                            >{data.project_title}</Text>
                        </View>
                    </View>
                    <View style={styles.CardsContainer}>
                        <View style={styles.key}>
                            <Text style={styles.keyText}>Role</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={{
                                color: '#6C7A89'}}
                            >{data?.pivot?.role_id?.role_name}</Text>
                        </View>
                    </View>
                    <View style={styles.CardsContainer}>
                        <View style={styles.key}>
                            <Text style={styles.keyText}>Initiation Date</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={{
                                color: '#6C7A89'
                                }}
                            >
                            {months[data?.pivot?.role_id?.created_at.split('-')[1]-1]} {data?.pivot?.role_id?.created_at.split('-')[0]}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.CardsContainer}>
                        <View style={styles.key}>
                            <Text style={styles.keyText}>Submission Date</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={{
                                color: '#6C7A89'
                                }}
                            >{months[data[0]?.pivot?.role_id?.updated_at.split('-')[1]-1]} {data?.pivot?.role_id?.updated_at.split('-')[0]}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.CardsContainer}>
                        <View style={styles.key}>
                            <Text style={styles.keyText}>Team</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={{
                                color: '#6C7A89',
                                width: '45%'
                                }}
                            >{data.team_id}</Text>
                        </View>
                    </View>
                </View>
                )
            })}
            
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
    ReportProjectContainer:{
        backgroundColor: '#32465B',
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    CardsContainer: {
        backgroundColor: '#fff',
        width: '110%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 15
    },
    key: {
        borderRightWidth: 2,
        borderRightColor: '#32465B',
        padding: 20,
        paddingLeft: 30,
        width: '50%'
    },
    keyText: {
        color: '#32465B',
    },
    value:{
        padding: 20,
        width: '50%',
        paddingLeft: 50
    },
    valueText: {
        color: '#6C7A89',
    }
})