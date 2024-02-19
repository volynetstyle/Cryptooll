import React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/joy/Snackbar";

type SnackbarEvent = Event | React.SyntheticEvent<any, Event> | null;

interface CustomSnackbarProps {
  autoHideDuration?: number;
  message?: string;
  isOpen: boolean;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  autoHideDuration = 4000,
  message = "",
  isOpen,
}) => {


  const [open, setOpen] = React.useState(false);

  const [duration, setDuration] = React.useState<undefined | number>();
  const [left, setLeft] = React.useState<undefined | number>();
  const timer = React.useRef<undefined | number>();
  const countdown = () => {
    timer.current = window.setInterval(() => {
      setLeft((prev) => (prev === undefined ? prev : Math.max(0, prev - 100)));
    }, 100);
  };
  React.useEffect(() => {
    if (isOpen && duration !== undefined && duration > 0) {
      setLeft(duration);
      countdown();
    } else {
      window.clearInterval(timer.current);
    }
  }, [open, duration]);
  const handlePause = () => {
    window.clearInterval(timer.current);
  };
  const handleResume = () => {
    countdown();
  };

  return (
    <Snackbar
      variant="solid"
      color="danger"
      autoHideDuration={duration}
      resumeHideDuration={left}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
      onUnmount={() => setLeft(undefined)}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;
