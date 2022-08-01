// Place any imports required by your custom components at the top of
// this file. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section. The first import from
// 'react' is required.
import React from 'react';
import { Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Define and export your components as named exports here.
// You can reference them within a Custom Code block
// as <CustomCode.MyTextComponent />

// Uncomment below to create your first component
// export const MyTextComponent = () => <Text>Hello world!</Text>;

export const CalendarComponent = () => {
  return (
    <Calendar
      onDayPress={day => {
        console.log('selected day', day);
      }}
      onDayLongPress={day => {
        console.log('selected day', day);
      }}
      onMonthChange={month => {
        console.log('month changed', month);
      }}
      hideExtraDays={true}
      firstDay={1}
      onPressArrowLeft={subtractMonth => subtractMonth()}
      onPressArrowRight={addMonth => addMonth()}
    />
  );
};
