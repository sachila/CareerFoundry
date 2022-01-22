import { CalendarPage } from "./CalendarPages/CalendarPage";
import { CalanderPageContainer } from "./elements";

export const MainPage: React.FC = () => {
  return (
    <CalanderPageContainer>
      <CalendarPage />
    </CalanderPageContainer>
  );
};
