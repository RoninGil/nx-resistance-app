import React, { useEffect, useState, useMemo } from 'react'
import { BAND_COLOR_CODES } from '../constants';

import { BandColors } from '../types/BandColors';
import { Resistor } from '../types/Resistor';

//in case the api fails, the mock data will take its place. just for evaluation purposes
const initialState = BAND_COLOR_CODES;

//TODO: create DTO for the api. Implement axios.
export const useHandleApiValues = () => {
    const [resistanceValues, setResistanceValues] = useState<Resistor>(initialState);

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
            let resistanceValuesData = initialState;
            try {
                const response = await fetch('http://localhost:3333/api/resistanceValues');
                const {data: resistanceData} = await response.json();
                //by default, mongo adds a property ._id to the database object, which we don't need for the ui in this case
                delete resistanceData._id;
                resistanceValuesData = resistanceData;
            } catch {
                window.alert('API failed.');
            } finally{
                setResistanceValues(resistanceValuesData);

            }
            
        }
        getResistanceData()
    }, []);
    
    return {colorValues, resistanceValues}
}
