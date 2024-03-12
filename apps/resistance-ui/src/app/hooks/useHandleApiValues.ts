import React, { useEffect, useState, useMemo } from 'react'
import { BandColors } from '../types/BandColors';

export const useHandleApiValues = () => {
    const [resistanceValues, setResistanceValues] = useState<BandColors[]>([]);

    const colorValues = useMemo(()=>{
        const colorValuesArray: BandColors[] = [];

        for (const colorKey of Object.keys(resistanceValues)) {
        colorValuesArray.push(colorKey as BandColors);
        }
        
        return (colorValuesArray);
    },[resistanceValues])

    //set the color values for ColorPicker component as the ones that come from the api
    useEffect(() => {
        const getResistanceData = async()=>{
            const response = await fetch('http://localhost:3333/api/resistanceValues');
            const {data: resistanceData} = await response.json();
            delete resistanceData._id;
            
            setResistanceValues(resistanceData);
        }
        getResistanceData()
    }, []);
    
    return {colorValues}
}
