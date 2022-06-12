import axios from 'axios';
import React, { useState } from 'react'
import { Button, StyleSheet, View} from 'react-native'
import Toast from 'react-native-root-toast';
import StarRating from 'react-native-star-rating';

export default function Rating(props) {
    const [count,setCount] = useState(null)
    const url = 'http://192.168.1.6:8000/api'
    const  onStarRatingPress = (rating) => {
        setCount(rating)
      }

      const submit = async() =>{
        let data={
          kpi_id: props.kpi_id,
          rating: count
        }
        await axios.put(`${url}/employees/update-kpi/${props.employee_id}`,data)
        .then((res)=>{
          Toast.show('KPI has been updated',{
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
          setCount(null)
        }).catch(()=>{
          Toast.show('Something went wrong',{
            duration: Toast.durations.LONG,
            position: 100,
            backgroundColor: 'red',
            textColor: 'black',
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
        })
      }
    return (
      <>
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
            onPress={submit}
      color="#5ED0C1"
      title="Update KPI"
      />
            </View>
      </>
    )
}

const styles = StyleSheet.create({
  addButton:{
    width: 200,
    backgroundColor:'#32465B',
    marginTop: 20,
    borderRadius: 5
},
})

