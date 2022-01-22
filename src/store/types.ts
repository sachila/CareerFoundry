import { stringOrDate } from "react-big-calendar";
import { CalendarAgendaModal } from "../Modals/CalendarAgendaModal";

// constants
export const SELECTED_DATE = "SELECTED_DATE";
export const UPDATE_MENTOR_DATA = "UPDATE_MENTOR_DATA";
export const NEW_SLOT = "NEW_SLOT";

// action types

export type SelectedDate = {
  type: typeof SELECTED_DATE;
  date: stringOrDate;
};

export type addNewSlot = {
  type: typeof NEW_SLOT;
  date: string;
  mentorId: string;
};

export type UpdateMentorData = {
  type: typeof UPDATE_MENTOR_DATA;
  data: CalendarAgendaModal;
  mentorId: string;
};

export type CalendarActions = SelectedDate | UpdateMentorData | addNewSlot;
