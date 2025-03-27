/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";

import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  viewMonthGrid,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-shadcn/dist/index.css";
import { useEffect, useState } from "react";

interface CalendarAppProps {
  id: string;
  title: string;
  start: string;
  end: string;
}

function CalendarApp({ events }: { events: CalendarAppProps[] }) {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    theme: "shadcn",
    isDark: true,
    calendars: {
      FULL_DAY: {
        colorName: "full_day",
        lightColors: {
          main: "#00C853",
          container: "#C8E6C9",
          onContainer: "#1B5E20",
        },
        darkColors: {
          main: "#A5D6A7",
          container: "#2E7D32",
          onContainer: "#C8E6C9",
        },
      },

      HALF_DAY: {
        colorName: "half_day",
        lightColors: {
          main: "#9E9E9E",
          container: "#E0E0E0",
          onContainer: "#424242",
        },
        darkColors: {
          main: "#BDBDBD",
          container: "#616161",
          onContainer: "#E0E0E0",
        },
      },
    },
    defaultView: viewMonthGrid.name,
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [...events],
    plugins: [eventsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  return <ScheduleXCalendar calendarApp={calendar || undefined} />;
}

export default CalendarApp;
