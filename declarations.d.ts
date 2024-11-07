// declarations.d.ts
declare module 'react-range-slider-input' {
    import React from 'react';
  
    export interface RangeSliderInputProps {
      min?: number;
      max?: number;
      step?: number;
      defaultValue?: [number, number];
      onInput?: (value: [number, number]) => void;
      // Add additional props as needed based on the library’s documentation
    }
  
    const RangeSliderInput: React.FC<RangeSliderInputProps>;
    export default RangeSliderInput;
  }
  