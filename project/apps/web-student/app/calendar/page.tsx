"use client";

import Navbar from "@/components/navbar/Navbar";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";

export default function CalendarPage() {
  return (
    <ScreenTransition>
      <div>
        <Navbar />
        <div id="controls" className="w-full bg-tone-1">
          <select>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div id="calendar">{/* Calendar will be rendered here */}</div>
      </div>
    </ScreenTransition>
  );
}
