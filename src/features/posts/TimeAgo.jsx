// `parseISO` parses a timestamp string into a Date object.
import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date); // Get the time difference between the date and now.
    timeAgo = `${timePeriod} ago`; // Construct the time ago string.
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
export default TimeAgo;
