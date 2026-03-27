export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  image: string;
  seats: number;
  registered: number;
  status: "upcoming" | "ongoing" | "completed";
  tags: string[];
  gradient: string;
}

export interface RegisteredEvent extends Event {
  registeredAt: string;
  ticketId: string;
  registrationStatus: "confirmed" | "pending" | "waitlisted";
}

export const allEvents: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2025",
    category: "Technology",
    date: "2025-03-25",
    time: "10:00 AM",
    location: "Main Auditorium",
    organizer: "Dr. Ramesh Kumar",
    description: "Explore the latest innovations in AI, ML, and emerging tech with industry leaders and researchers.",
    image: "laptop",
    seats: 200,
    registered: 143,
    status: "upcoming",
    tags: ["AI", "Machine Learning", "Innovation"],
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "2",
    title: "Annual Cultural Fiesta",
    category: "Cultural",
    date: "2025-04-05",
    time: "05:00 PM",
    location: "Open Air Theatre",
    organizer: "Cultural Committee",
    description: "A vibrant celebration of arts, dance, music, and creativity from students across all departments.",
    image: "theater",
    seats: 500,
    registered: 312,
    status: "upcoming",
    tags: ["Dance", "Music", "Art"],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: "3",
    title: "Entrepreneurship Bootcamp",
    category: "Business",
    date: "2025-03-30",
    time: "09:00 AM",
    location: "Seminar Hall B",
    organizer: "Prof. Anita Singh",
    description: "A 2-day intensive bootcamp on startup fundamentals, pitching ideas, and business model design.",
    image: "rocket",
    seats: 80,
    registered: 67,
    status: "upcoming",
    tags: ["Startup", "Business", "Pitch"],
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "4",
    title: "Photography Workshop",
    category: "Arts",
    date: "2025-04-12",
    time: "11:00 AM",
    location: "Media Lab",
    organizer: "Arts Club",
    description: "Learn composition, lighting, and post-processing from professional photographers.",
    image: "camera",
    seats: 40,
    registered: 28,
    status: "upcoming",
    tags: ["Photography", "Creative", "Workshop"],
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "5",
    title: "Coding Hackathon 24H",
    category: "Technology",
    date: "2025-04-18",
    time: "08:00 AM",
    location: "Computer Labs",
    organizer: "CSE Department",
    description: "24-hour hackathon to build innovative solutions for real-world problems. Win exciting prizes!",
    image: "zap",
    seats: 150,
    registered: 89,
    status: "upcoming",
    tags: ["Coding", "Competition", "Prizes"],
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "6",
    title: "Mental Wellness Seminar",
    category: "Health",
    date: "2025-04-22",
    time: "02:00 PM",
    location: "Conference Room 1",
    organizer: "Student Welfare",
    description: "Expert-led session on managing academic stress, mindfulness, and building resilience.",
    image: "wellness",
    seats: 100,
    registered: 45,
    status: "upcoming",
    tags: ["Wellness", "Mental Health", "Mindfulness"],
    gradient: "from-green-500 to-emerald-600",
  },
];

export const registeredEvents: RegisteredEvent[] = [
  {
    ...allEvents[0],
    registeredAt: "2025-03-10",
    ticketId: "TKT-2025-001",
    registrationStatus: "confirmed",
  },
  {
    ...allEvents[4],
    registeredAt: "2025-03-12",
    ticketId: "TKT-2025-002",
    registrationStatus: "confirmed",
  },
  {
    ...allEvents[1],
    registeredAt: "2025-03-14",
    ticketId: "TKT-2025-003",
    registrationStatus: "pending",
  },
];

export const studentStats = {
  totalRegistered: 3,
  upcomingEvents: 3,
  completedEvents: 2,
  certificatesEarned: 2,
};

export const facultyProfile = {
  name: "Dr. Selvan",
  title: "Associate Professor",
  department: "Computer Science & Engineering",
  employeeId: "FAC-2019-047",
  email: "selvan@gmail.com",
  phone: "+91 98765 43210",
  initials: "PN",
  eventsCreated: 6,
  eventsApproved: 2,
  totalParticipants: 829,
  rating: 4.8,
};
