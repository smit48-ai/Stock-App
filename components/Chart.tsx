import React from 'react';
import {View, Text} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { windowWidth } from '../utils/Dimensions';


//TODO: somtimes animated value error comes 
//TODO: change some parameters to set the min value for different 1h,1d,etc..
//TODO: change the width and spacing to contain the whole width every time
//TODO: change the money and date format a bit as well

const ScrollingChartWithPointer = ({ChartData}:any) => {
  // console.log(ChartData);
  
  var FilteredData=[];
  const length=ChartData?.timestamp?.length;
  var maxValue=-1;
  for(let i=0; i<length; i++){
     var obj={
        value:ChartData.indicators.quote[0].close[i],
        date:new Date(ChartData.timestamp[i]*1000)
     }
     maxValue=Math.max(ChartData.indicators.quote[0].open[i],maxValue);
     FilteredData.push(obj);
  }
  // console.log(FilteredData);
  
  return (
    <View
      style={{
        backgroundColor: 'white',
      }}>
      <LineChart
        // areaChart
        //TODO:data point
        data={FilteredData}
        yAxisLabelWidth={0}
        rotateLabel
        width={windowWidth-10}
        hideDataPoints
        //TODO:change accoring to interval ig
        spacing={(windowWidth-10)/length}
        color="green"
        thickness={0}
        initialSpacing={0}
        noOfSections={6}
        stepHeight={50}
        height={300}
        rulesThickness={0}
        //TODO: change these max value
        maxValue={maxValue}
        yAxisThickness={0}
        xAxisTextNumberOfLines={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{color:'white'}}
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: 'white',
          pointerStripWidth: 2,
          pointerColor: 'black',
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          // activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: (items:any) => {
            return (
              <View
                style={{
                  height: 90,
                  width: 100,
                  justifyContent: 'center',
                
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,

                    marginBottom: 6,
                    textAlign: 'center',
                  }}>
                  {items[0].date.toString()}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 16,
                    backgroundColor: 'black',
                  }}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center', color:"white"}}>
                    {'₹' + items[0].value?.toFixed(5)}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </View>
  );
};

export default ScrollingChartWithPointer;