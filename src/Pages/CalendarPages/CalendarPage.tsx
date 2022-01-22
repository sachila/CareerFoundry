import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../../store/action";
import { RequestAppoinment } from "./RequestAppoinment";
import { useStateSelectors } from "../../store/selector";
import {
  AppoinmentContainer,
  CalanderPageContainer,
  MainCalendar,
} from "../elements";
import { useState } from "react";

const localizer = momentLocalizer(moment);

export const CalendarPage: React.FC = () => {
  const dispatch = useDispatch();
  const { date } = useStateSelectors();

  return (
    <>
      <MainCalendar>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          events={[]}
          onSelectSlot={(ev) => {
            console.log(ev.start);

            const date = ev.start;
            if (date) {
              dispatch(setSelectedDate(date));
            }
          }}
          selectable={true}
        />
      </MainCalendar>
      {date && (
        <AppoinmentContainer>
          <RequestAppoinment />
        </AppoinmentContainer>
      )}
    </>
  );
};
