import React, { useState } from 'react'
import { TouchableHighlight, TouchableOpacity, Text, View, Image} from 'react-native'
import CheckIcon from '../assets/images/check-icon.png'

export default function Task({data, deleteTask}) {

    const [pressDown, setPressDown] = useState(false)

    return (
        <TouchableHighlight style={{ padding: 15, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPressIn={()=> setPressDown(true)} onPress={()=> deleteTask(data.id)} style={{height: 20, width: 20, backgroundColor: pressDown ? 'green' : 'white', marginRight: 15, alignItems: 'center', borderRadius: 10}}>
                        {pressDown && <Image source={CheckIcon} style={{height: 15, width: 15}}/>}
                    </TouchableOpacity>
                    <Text style={{color: 'white', width: 230}}>{data.name}</Text>
                </View>
                <Text style={{color: 'white', opacity: 0.5}}>
                    {`${data.createdAt.getMonth()}/${data.createdAt.getDate()}/${data.createdAt.getFullYear()}`}
                </Text>
            </View>
        </TouchableHighlight>
    )
}