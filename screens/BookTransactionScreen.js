import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { normalize } from 'yargs';

export default class TransactionScreen extends React.Component {
constructor(){
    super()
    this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
    }
}
getCameraPermissions=async ()=>{
    const {status} =await Permissions.askAsync(Permissions.CAMERA);

    this.setState({hasCameraPermissions:status ==="granted",
                    buttonState:'clicked',
                    scanned:false
              })
}
handleBarCodeScanner=async(type,data)=>{
   this.setState({
    scanned:true,
    scannedData:data,
    buttonState:'normal'
   })
}

    render(){
        const hasCameraPermissions=this.setState.hasCameraPermissions;
        const  scannedData=this.setState.scannedData;
         const  buttonState=this.setState.buttonState;
         if(buttonState ==="clicked" && hasCameraPermissions){
             return(<BarCodeScanner
             onBarCodeScanned ={scanned?undefined:this.handleBarCodeScanner}
             style={StyleSheet.absoluteFillObject}
              >
                 
             </BarCodeScanner>)
         }
         else if(buttonState ===normal){
            return (
                <View style={styles.container}>

                   <Text style={styles.diplayText}> 
             {hasCameraPermissions===true ? this.state.scannedData:"Request Camera Permissions"} 
                        </Text>
                    <TouchableOpacity style={styles.scanButton}
                    onPress={this.getCameraPermissions}>
                        <Text style={styles.diplayText}> 
                            SCAN QR CODE  
                        </Text>
                        </TouchableOpacity>
                 
                </View>
            );
        }
         }
        

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"},
    diplayText:
    {
        fontSize:15,
        textDecorationLine:'underline'
   },
   scanButton:{
       backgroundColor:"#2196F3",
       padding:10,
       margin:10,
   }

})

