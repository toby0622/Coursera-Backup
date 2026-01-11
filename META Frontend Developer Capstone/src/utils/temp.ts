const availableTimeSlots = [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export const initializeTimes = (): string[] => {
  return availableTimeSlots;
};

export const updateTimes = (state: string[], action: { type: string; date?: string }): string[] => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return availableTimeSlots;
    default:
      return state;
  }
};
