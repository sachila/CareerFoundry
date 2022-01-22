import { stringOrDate } from "react-big-calendar";
import { CalendarAgendaModal } from "../Modals/CalendarAgendaModal";
import {
  DispatchAddNewSlot,
  DispatchSelectedDate,
  DispatchUpdateMentorDate,
} from "./dispatch";
import {
  addNewSlot,
  NEW_SLOT,
  SelectedDate,
  SELECTED_DATE,
  UpdateMentorData,
  UPDATE_MENTOR_DATA,
} from "./types";

export function setSelectedDate(date: stringOrDate) {
  return (dispatch: DispatchSelectedDate) => {
    const action: SelectedDate = {
      type: SELECTED_DATE,
      date,
    };
    dispatch(action);
  };
}

export function updateMentorData(mentorId: string, data: CalendarAgendaModal) {
  return (dispatch: DispatchUpdateMentorDate) => {
    const action: UpdateMentorData = {
      type: UPDATE_MENTOR_DATA,
      mentorId,
      data,
    };
    dispatch(action);
  };
}

export function AddNewSlotToMentor(mentorId: string, date: string) {
  return (dispatch: DispatchAddNewSlot) => {
    const action: addNewSlot = {
      type: NEW_SLOT,
      mentorId,
      date,
    };
    dispatch(action);
  };
}
