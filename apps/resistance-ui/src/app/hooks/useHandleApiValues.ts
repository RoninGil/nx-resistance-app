import React, { useEffect, useState } from 'react'
import { BandColors } from '../types/BandColors';
import { BAND_COLOR_CODES } from '../constants';

const mockApiData = BAND_COLOR_CODES;

export const useHandleApiValues = () => {
    const [colorValues, setColorValues] = useState<BandColors[]>([]);

    //set the color values for ColorPicker component as the ones that come from the api
    useEffect(() => {
        const colorValuesArray: BandColors[] = [];
        for (const colorKey of Object.keys(mockApiData)) {
        colorValuesArray.push(colorKey as BandColors);
        }
        setColorValues(colorValuesArray);
    }, []);
    
    return {colorValues}
}
