# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `Start Project`

Run the command `yarn` followed by `yarn start` to runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
 

### `Assumptions and Steps`

Redux store with thunk is used to store the app data.\
Material UI is used as a UI library.\
The styled component is used to update the component styles.\

npm package `react-big-calendar` is used to populate the calendar view.\
Please use the `month` view of the calendar to book an appointment. \

Once a date is selected, an appointment register view will appear.\

Once a mentor is selected, all the timeslots will appear, and already booked sessions will be greyed out and disabled.\

Once the user confirms the appointment, the redux store will get updated and, the selected timeslot will be marked as already booked.\