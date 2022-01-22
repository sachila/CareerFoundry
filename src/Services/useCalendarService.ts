import { CalendarAgendaModal } from "../Modals/CalendarAgendaModal";
import { MentorModal } from "../Modals/MentorModal";
import { ApiUrl, UseRemote } from "./remote";

export const useCalendarService = () => {
  const { fetchGet } = UseRemote();

  const loadAllMentorData = async (mentorId: string) => {
    const result = await fetchGet<CalendarAgendaModal>(
      `${ApiUrl}/mentors/${mentorId}/agenda`
    );
    return result;
  };

  return { loadAllMentorData };
};
