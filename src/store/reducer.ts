import { InitialState } from "./initialState";
import {
  CalendarActions,
  NEW_SLOT,
  SELECTED_DATE,
  UPDATE_MENTOR_DATA,
} from "./types";

const initialState: InitialState = { mentorData: {} };

const reducer = (
  state: InitialState = initialState,
  action: CalendarActions
): InitialState => {
  switch (action.type) {
    case SELECTED_DATE: {
      return {
        ...state,
        date: action.date,
      };
    }
    case UPDATE_MENTOR_DATA: {
      const mentorData = { ...state.mentorData };
      mentorData[action.mentorId] = action.data;

      return {
        ...state,
        mentorData,
      };
    }

    case NEW_SLOT: {
      const mentorData = state.mentorData[action.mentorId];
      if (mentorData) {
        mentorData.calendar.push({ date_time: action.date });
      }
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reducer;
