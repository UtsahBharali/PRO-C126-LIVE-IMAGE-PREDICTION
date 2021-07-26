import React from 'react'
import { Button,PermissionsAndroid,Platform,Veiw } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as permissions from 'expo-permissions'
 
export default class PickImage extends React.Component{
    
    getPermissionAsync = async()=>{
        if (Platform.OS!=="web"){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status!=="granted"){
                alert("Sorry we need permissions to start this work")
            }
        }
    }

    componentDidMount(){
        this.getPermissionAsync()
    }

    _pickImage = async()=>{
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            })

            if (!result.cancelled){
                this.setState({
                    image:result.data
                })
               console.log(result.uri)
               this.uploadImage(result.uri) 
            }
        }
        catch(E){
            console.log(E)
        }
    }

    state = {
        image:null
    }
    render(){
        let {image} = this.state
        return(
            <View>
                <Button 
                title = "Pick an image from camera roll"
                onPress = {this._pickImage}
                />

            </View>
        )
    }
}