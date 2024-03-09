export type ColorPickerProps = {
    colorValues: (
        {
            name: string; 
        }
    )[];
    onChange: (value: string)=> void;
};