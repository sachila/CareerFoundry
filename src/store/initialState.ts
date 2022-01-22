import { stringOrDate } from "react-big-calendar";
import { CalendarAgendaModal } from "../Modals/CalendarAgendaModal";

export type InitialState = {
  date?: stringOrDate;
  mentorData: { [mentorId: string]: CalendarAgendaModal };
};
