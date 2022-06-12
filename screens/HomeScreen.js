import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconOne from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
    return (
         <View style={styles.homeContainer}>
    <TouchableHighlight 
        onPress={() =>
          navigation.navigate('Evaluate KPI')
      }
    >
        <View style={styles.reportContainer}>
        <IconOne name="pencil-square-o" size={60} color="#32465B" />
          <Text style={styles.textContainer}>Evaluate KPI</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => navigation.navigate('Get KPI')}
      >
        <View style={styles.reportContainer}>
        <IconOne name="bar-chart" size={60} color="#32465B" />
          <Text style={styles.textContainer}>View KPIs</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
      onPress={() =>
        navigation.navigate('View Project')
    }>
        <View style={styles.reportContainer}>
        <Icon name="clipboard-list" size={60} color="#32465B" />
          <Text style={styles.textContainer}>View Project Report</Text>
        </View>
      </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor: "#32465B",
        width: '100%',
        height: '100%',
        alignItems: 'center',
        margin: 0,
        justifyContent: 'space-evenly'
    },
    reportContainer:{
        backgroundColor: '#5ED0C1',
        width: 300,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        borderRadius: 10,
    },
    textContainer: {
        color: '#32465B',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
    }
})
