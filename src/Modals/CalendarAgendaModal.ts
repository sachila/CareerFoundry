export interface CalendarAgendaModal {
  mentor: Mentor;
  calendar: { date_time: string }[];
}

export interface Mentor {
  name: string;
  time_zone: string;
}
