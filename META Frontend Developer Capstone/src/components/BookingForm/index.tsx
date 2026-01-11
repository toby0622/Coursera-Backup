import { FC, useState, FormEvent, Dispatch } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Container, Top, Form, FormMessageError } from "./styles";

interface BookingFormProps {
  availableTimes: string[];
  dispatch: Dispatch<{ type: string; date?: string }>;
}

const BookingForm: FC<BookingFormProps> = ({ availableTimes, dispatch }): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("1");
  const [occasion, setOccasion] = useState<string>("Birthday");

  const [errors, setErrors] = useState<{
    date?: string;
    time?: string;
    guests?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { date?: string; time?: string; guests?: string } = {};

    if (!date) {
      newErrors.date = "Please select a date";
    }

    if (!time) {
      newErrors.time = "Please select a time";
    }

    const guestsNum = parseInt(guests);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 10) {
      newErrors.guests = "Number of guests must be between 1 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    dispatch({ type: "UPDATE_TIMES", date: newDate });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const booking = { date, time, guests, occasion };
      localStorage.setItem("Bookings", JSON.stringify(booking));
      navigate("/confirmed");
    }
  };

  return (
    <Container>
      <Top>
        <h1>Reserve a Table</h1>
      </Top>
      <Form onSubmit={handleSubmit} aria-label="Reservation form">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          aria-label="Choose date"
          required
        />
        {errors.date && <FormMessageError>{errors.date}</FormMessageError>}

        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-label="Choose time"
          required
        >
          <option value="">Select a time</option>
          {availableTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>
        {errors.time && <FormMessageError>{errors.time}</FormMessageError>}

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          aria-label="Number of guests"
          required
        />
        {errors.guests && <FormMessageError>{errors.guests}</FormMessageError>}

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          aria-label="Occasion"
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="submit"
          value="Make Your Reservation"
          aria-label="Submit reservation"
        />
      </Form>
    </Container>
  );
};

export default BookingForm;
