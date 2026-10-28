const pad = (n) => String(n).padStart(2, "0");

export const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const minutesToTime = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

export const formatSlotLabel = (time) => {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${pad(m)} ${suffix}`;
};

export const generateSlots = (opensAt, closesAt, interval = 60) => {
  const start = toMinutes(opensAt);
  const end = toMinutes(closesAt);
  const slots = [];
  for (let t = start; t + interval <= end; t += interval) {
    slots.push(minutesToTime(t));
  }
  return slots;
};

export const getSlotEnd = (start, durationHours) =>
  minutesToTime(toMinutes(start) + durationHours * 60);

export const isSlotRangeFree = (start, durationHours, bookedStarts, opensAt, closesAt) => {
  const rangeStart = toMinutes(start);
  const rangeEnd = rangeStart + durationHours * 60;
  if (rangeEnd > toMinutes(closesAt) || rangeStart < toMinutes(opensAt)) return false;
  return !bookedStarts.some((booked) => {
    const b = toMinutes(booked);
    return b >= rangeStart && b < rangeEnd;
  });
};
