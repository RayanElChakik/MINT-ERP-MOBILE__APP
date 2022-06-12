import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import ViewKPI from './screens/ViewKPI'
import ViewProject from "./screens/ViewProject";
import EvaluateKPI from "./screens/EvaluateKPI";
import KPICharts from "./screens/KPICharts";
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <RootSiblingParent>
  <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ERP Mint"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5ED0C1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: '22'
          },
          animation:'slide_from_right'
        }}

      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
          title: 'ERP Mint',
          }}
        />
         <Stack.Screen 
          name="Get KPI" 
          component={ViewKPI} 
          options={{
          title: 'Get KPI',
          }}
        />
         <Stack.Screen 
          name="Evaluate KPI" 
          component={EvaluateKPI} 
          options={{
          title: 'Evaluate KPI',
          }}
        />
         <Stack.Screen 
          name="KPI Charts" 
          component={KPICharts} 
          options={{
          title: 'KPI Charts',
          }}
        />
          <Stack.Screen 
          name="View Project" 
          component={ViewProject} 
          options={{
          title: 'View Project',
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    </RootSiblingParent>
  );
}

