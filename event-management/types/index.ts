export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
  image: string;
  status: "upcoming" | "ongoing" | "completed";
  tags: string[];
  organizer: string;
}

export interface RegisteredEvent extends Event {
  registeredAt: string;
  ticketId: string;
  seatNumber: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  avatar: string;
  registeredEvents: string[];
}
