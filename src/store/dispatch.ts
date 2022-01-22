import { addNewSlot, SelectedDate, UpdateMentorData } from "./types";

export type DispatchSelectedDate = (args: SelectedDate) => SelectedDate;
export type DispatchAddNewSlot = (args: addNewSlot) => addNewSlot;
export type DispatchUpdateMentorDate = (
  args: UpdateMentorData
) => UpdateMentorData;

export type DispathType =
  | DispatchSelectedDate
  | DispatchUpdateMentorDate
  | DispatchAddNewSlot;
