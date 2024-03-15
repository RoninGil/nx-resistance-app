import { Resistor } from "../types/Resistor";

//Mock data
export const BAND_COLOR_CODES: Resistor = {
    none:{
        digitValue: undefined,
        multiplier: undefined,
        tolerancePercentage: 20
    },
    pink:{
        digitValue: undefined,
        multiplier: 0.001,
        tolerancePercentage: undefined
    },
    silver:{
        digitValue: undefined,
        multiplier: 0.01,
        tolerancePercentage: 10
    },
    gold: {
        digitValue: undefined,
        multiplier: 0.1,
        tolerancePercentage: 5
    },
    black: {
        digitValue: 0,
        multiplier: 1,
        tolerancePercentage: undefined
    },
    brown: {
        digitValue: 1,
        multiplier: 10,
        tolerancePercentage: 1
    },
    red: {
        digitValue: 2,
        multiplier: 100,
        tolerancePercentage: 2
    },
    orange: {
        digitValue: 3,
        multiplier: 1000,
        tolerancePercentage: 0.05
    },
    yellow: {
        digitValue: 4,
        multiplier: 10000,
        tolerancePercentage: 0.02
    },
    green: {
        digitValue: 5,
        multiplier: 100000,
        tolerancePercentage: 0.5
    },
    blue: {
        digitValue: 6,
        multiplier: 1000000,
        tolerancePercentage: 0.25
    },
    violet:{
        digitValue: 7,
        multiplier: 10000000,
        tolerancePercentage: 0.1
    },
    gray: {
        digitValue: 8,
        multiplier: 100000000,
        tolerancePercentage: 0.01
    },
    white: {
        digitValue: 9,
        multiplier: 1000000000,
        tolerancePercentage: undefined
    },
}