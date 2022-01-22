import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { TimeSlot } from "../../Modals/TimeSlots";
import { AllTimeSlots, AvailabeMentors } from "../../Services/MockData";
import { useCalendarService } from "../../Services/useCalendarService";
import { AddNewSlotToMentor, updateMentorData } from "../../store/action";
import { useStateSelectors } from "../../store/selector";
import { ConfirmationDialog } from "./ConfirmationDialog";
import {
  ChipContainer,
  CircularProgressContainer,
  ConfirmContainer,
  ConfirmDetailLabel,
  ConfirmDetailValue,
  Flex,
  FormContainer,
  FormRow,
  RequestAppoinmentContainer,
} from "./elements";

export const RequestAppoinment: React.FC = () => {
  const { date, mentorData } = useStateSelectors();
  const { loadAllMentorData } = useCalendarService();
  const dispatch = useDispatch();

  const DATE_FORMAT = "YYYY-MM-DD";

  const [mentorDropdown, setMentorDropdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reasonInput, setReasonInput] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>();

  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false);

  const calendarDataLength =
    mentorDropdown &&
    mentorData[mentorDropdown] &&
    mentorData[mentorDropdown].calendar
      ? mentorData[mentorDropdown].calendar.length
      : 0;

  useEffect(() => {
    if (mentorDropdown) {
      setIsLoading(true);
      loadAllMentorData(mentorDropdown).then(
        (data) => {
          dispatch(updateMentorData(mentorDropdown, data));
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        }
      );
    }
  }, [mentorDropdown]);

  const availbaleTimeSlots: TimeSlot[] = useMemo(() => {
    const allSlots: TimeSlot[] = JSON.parse(JSON.stringify(AllTimeSlots)); // deep copy

    setSelectedSlot(undefined);
    if (!mentorDropdown) return [];
    if (!mentorData[mentorDropdown] || !mentorData[mentorDropdown].calendar) {
      return allSlots;
    }

    const allMentorTimeSlots = mentorData[mentorDropdown].calendar;

    const currentDateMentorSlots = allMentorTimeSlots.filter((mentorSlot) => {
      const mentorDate = mentorSlot.date_time.split(" ")[0];
      const selectedDate = moment(date).format(DATE_FORMAT);
      return selectedDate === mentorDate;
    });

    currentDateMentorSlots.forEach((mentorSlot) => {
      const mentorStartTime = mentorSlot.date_time.split(" ")[1];
      const mentorMeetingTime = mentorSlot.date_time.split("+")[1];

      const mentorStartHour = mentorStartTime.split(":")[0];
      const mentorStartHourWithMinutes =
        mentorStartHour + mentorSlot.date_time.split(":")[1];

      const mentorEndHourWithMinutes = (
        +mentorStartHourWithMinutes + +mentorMeetingTime
      ).toString();

      allSlots.forEach((slot) => {
        if (
          +slot.end > +mentorStartHourWithMinutes &&
          +mentorStartHourWithMinutes > +slot.start
        ) {
          slot.enable = false;
        } else if (
          +slot.end > +mentorEndHourWithMinutes &&
          +mentorEndHourWithMinutes > +slot.start
        ) {
          slot.enable = false;
        } else if (
          +slot.start === +mentorStartHourWithMinutes &&
          +mentorEndHourWithMinutes === +slot.end
        ) {
          slot.enable = false;
        }
      });
    });

    return allSlots;
  }, [mentorData, date, calendarDataLength]);

  const handleOnChipClick = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReasonInput(event.target.value);
  };

  const handleMentorDropdownChange = (event: SelectChangeEvent) => {
    const newMentorId = event.target.value;
    setMentorDropdown(newMentorId);
  };

  const closeConfirmDialog = () => {
    setShouldOpenConfirmDialog(false);
  };

  const onConfirmationYesClick = () => {
    if (selectedSlot && mentorDropdown) {
      const scheduleDate = moment(date).format(DATE_FORMAT);
      const startTime = `${selectedSlot.start.substring(0, 2)}:00:00`;
      const duration = `+${+selectedSlot.end - +selectedSlot.start}`;

      const fullDate = `${scheduleDate} ${startTime} ${duration}`;

      dispatch(AddNewSlotToMentor(mentorDropdown, fullDate));
      setSelectedSlot(undefined);
      setShouldOpenConfirmDialog(false);
    }
  };

  return (
    <RequestAppoinmentContainer>
      <FormContainer>
        <FormRow>
          <ConfirmDetailLabel>
            Selected Date &nbsp;
            <span style={{ fontWeight: 400 }}>
              {moment(date).format(DATE_FORMAT)}
            </span>
          </ConfirmDetailLabel>
        </FormRow>
        <FormRow>
          <FormControl>
            <InputLabel id="mentor-select-label">Select A Mentor</InputLabel>
            <Select
              id="mentor-select"
              value={mentorDropdown}
              label="Mentor"
              onChange={handleMentorDropdownChange}
            >
              {AvailabeMentors.map((mentor) => (
                <MenuItem value={mentor.id}>{mentor.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormRow>

        {isLoading && (
          <FormRow>
            <CircularProgressContainer>
              <CircularProgress />
            </CircularProgressContainer>
          </FormRow>
        )}
        <FormRow>
          <ChipContainer>
            {availbaleTimeSlots.map((slot) => (
              <Chip
                label={slot.caption}
                variant="outlined"
                disabled={!slot.enable}
                onClick={() => handleOnChipClick(slot)}
                style={{
                  backgroundColor:
                    selectedSlot?.caption === slot.caption
                      ? "#1976d2"
                      : "#e0e0e0",
                  color:
                    selectedSlot?.caption === slot.caption ? "white" : "black",
                }}
              />
            ))}
          </ChipContainer>
        </FormRow>
        <FormRow>
          <TextField
            id="reason-input"
            label="Reason for the call"
            variant="outlined"
            required
            value={reasonInput}
            onChange={handleReasonChange}
            disabled={!selectedSlot}
          />
        </FormRow>
        <FormRow>
          <Button
            variant="contained"
            disabled={!selectedSlot || !reasonInput}
            onClick={() => {
              setShouldOpenConfirmDialog(true);
            }}
          >
            Submit
          </Button>
        </FormRow>
      </FormContainer>

      <ConfirmationDialog
        open={shouldOpenConfirmDialog}
        onConfirmDialogClose={closeConfirmDialog}
        onYesClick={onConfirmationYesClick}
        title={"Appointment Confirmation !!"}
        customRenderBody={() => {
          return (
            <ConfirmContainer>
              <Flex style={{ paddingBottom: 15 }}>
                <ConfirmDetailLabel>
                  Please confirm the following appoinment details
                </ConfirmDetailLabel>
              </Flex>
              {mentorDropdown && mentorData[mentorDropdown] && (
                <Flex>
                  <ConfirmDetailLabel>Mentor Name</ConfirmDetailLabel>
                  <ConfirmDetailValue>
                    {mentorData[mentorDropdown].mentor.name}
                  </ConfirmDetailValue>
                </Flex>
              )}

              {date && (
                <Flex>
                  <ConfirmDetailLabel>Date</ConfirmDetailLabel>
                  <ConfirmDetailValue>
                    {moment(date).format("YYYY-MM-DD")}
                  </ConfirmDetailValue>
                </Flex>
              )}
              {selectedSlot && (
                <Flex>
                  <ConfirmDetailLabel>Time Slot</ConfirmDetailLabel>
                  <ConfirmDetailValue>
                    {selectedSlot?.caption}
                  </ConfirmDetailValue>
                </Flex>
              )}
              <Flex>
                <ConfirmDetailLabel>Reason</ConfirmDetailLabel>
                <ConfirmDetailValue>{reasonInput}</ConfirmDetailValue>
              </Flex>
            </ConfirmContainer>
          );
        }}
      />
    </RequestAppoinmentContainer>
  );
};
