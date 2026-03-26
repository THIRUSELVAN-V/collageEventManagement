export type EventStatus = "pending" | "approved" | "rejected" | "draft";
export type EventCategory = "Technical" | "Cultural" | "Sports" | "Workshop" | "Seminar" | "Fest";
export type EventBannerIcon = "cpu" | "laptop" | "shield" | "cloud" | "radio" | "file-text";

export interface FacultyEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  description: string;
  maxParticipants: number;
  registeredCount: number;
  status: EventStatus;
  createdAt: string;
  submittedAt?: string;
  approvedAt?: string;
  rejectedReason?: string;
  banner: EventBannerIcon;
  gradient: string;
  tags: string[];
  department: string;
  coordinators: string[];
  budget?: number;
  isOnline: boolean;
  meetLink?: string;
}

export const facultyEvents: FacultyEvent[] = [
  {
    id: "fe-001",
    title: "National Symposium on Deep Learning",
    category: "Technical",
    date: "2025-04-10",
    endDate: "2025-04-11",
    time: "09:30 AM",
    venue: "Seminar Hall A, Block 3",
    description: "A two-day national symposium covering deep learning architectures, transformers, and real-world deployment strategies with invited speakers from IITs and industry.",
    maxParticipants: 300,
    registeredCount: 214,
    status: "approved",
    createdAt: "2025-02-15",
    submittedAt: "2025-02-18",
    approvedAt: "2025-02-22",
    banner: "cpu",
    gradient: "from-[#1e3a8a] to-[#1d4ed8]",
    tags: ["AI", "Deep Learning", "Research"],
    department: "CSE",
    coordinators: ["Dr. Selvan ", "Mr. Thiru"],
    budget: 45000,
    isOnline: false,
  },
  {
    id: "fe-002",
    title: "Full-Stack Dev Bootcamp",
    category: "Workshop",
    date: "2025-04-22",
    time: "10:00 AM",
    venue: "Computer Lab 2 & 3",
    description: "3-day hands-on bootcamp covering React, Node.js, MongoDB and deployment on AWS. Industry mentors will guide participants through building a production-ready app.",
    maxParticipants: 60,
    registeredCount: 58,
    status: "approved",
    createdAt: "2025-02-28",
    submittedAt: "2025-03-02",
    approvedAt: "2025-03-07",
    banner: "laptop",
    gradient: "from-[#065f46] to-[#059669]",
    tags: ["Web Dev", "React", "Node.js"],
    department: "CSE",
    coordinators: ["Prof. Kavitha Reddy"],
    budget: 12000,
    isOnline: false,
  },
  {
    id: "fe-003",
    title: "Cybersecurity Awareness Drive",
    category: "Seminar",
    date: "2025-05-03",
    time: "02:00 PM",
    venue: "Main Auditorium",
    description: "An awareness seminar on ethical hacking, data privacy, social engineering, and best practices for digital safety in academic environments.",
    maxParticipants: 400,
    registeredCount: 187,
    status: "pending",
    createdAt: "2025-03-05",
    submittedAt: "2025-03-07",
    banner: "shield",
    gradient: "from-[#7c2d12] to-[#ea580c]",
    tags: ["Cybersecurity", "Privacy", "Ethical Hacking"],
    department: "CSE / IT",
    coordinators: ["Dr. Ramesh Sharma", "Ms. Deepika Pillai"],
    budget: 20000,
    isOnline: false,
  },
  {
    id: "fe-004",
    title: "Cloud Computing Masterclass",
    category: "Workshop",
    date: "2025-05-15",
    time: "11:00 AM",
    venue: "Online (Google Meet)",
    description: "A live online masterclass on AWS, Azure, and GCP fundamentals with certification prep tips. Recordings available post-session.",
    maxParticipants: 500,
    registeredCount: 320,
    status: "pending",
    createdAt: "2025-03-08",
    submittedAt: "2025-03-09",
    banner: "cloud",
    gradient: "from-[#1e40af] to-[#7c3aed]",
    tags: ["Cloud", "AWS", "Azure"],
    department: "CSE",
    coordinators: ["Prof. Anand Krishnan"],
    budget: 5000,
    isOnline: true,
    meetLink: "https://meet.google.com/xyz-abc",
  },
  {
    id: "fe-005",
    title: "IoT Innovation Challenge",
    category: "Technical",
    date: "2025-06-02",
    time: "09:00 AM",
    venue: "Electronics Lab, Block 2",
    description: "Teams of 3 build IoT-based prototypes solving real-world problems. Prize pool of ₹50,000 sponsored by local industry partners.",
    maxParticipants: 120,
    registeredCount: 0,
    status: "draft",
    createdAt: "2025-03-09",
    banner: "radio",
    gradient: "from-[#134e4a] to-[#0d9488]",
    tags: ["IoT", "Hardware", "Competition"],
    department: "ECE / CSE",
    coordinators: ["Dr. Vijay Anand"],
    budget: 55000,
    isOnline: false,
  },
  {
    id: "fe-006",
    title: "Research Paper Writing Workshop",
    category: "Workshop",
    date: "2025-03-20",
    time: "03:00 PM",
    venue: "Seminar Hall B",
    description: "Focused workshop for final year students on structuring and writing IEEE/Springer-format research papers with hands-on LaTeX practice.",
    maxParticipants: 50,
    registeredCount: 50,
    status: "rejected",
    createdAt: "2025-02-10",
    submittedAt: "2025-02-12",
    rejectedReason: "Scheduling conflict with department exams. Please reschedule to April.",
    banner: "file-text",
    gradient: "from-[#4a1d96] to-[#7c3aed]",
    tags: ["Research", "LaTeX", "Academic Writing"],
    department: "CSE",
    coordinators: ["Dr. Meena Sundaram"],
    budget: 8000,
    isOnline: false,
  },
];

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

export const dashboardStats = {
  totalEvents: 6,
  approved: 2,
  pending: 2,
  drafts: 1,
  rejected: 1,
  totalRegistrations: 829,
  upcomingThisMonth: 3,
  avgFillRate: 78,
};

export const recentActivity = [
  { id: 1, action: "Event approved", event: "Full-Stack Dev Bootcamp", time: "2 days ago", type: "success" },
  { id: 2, action: "New registration", event: "National Symposium on Deep Learning", time: "4 hours ago", type: "info" },
  { id: 3, action: "Event submitted for review", event: "Cybersecurity Awareness Drive", time: "2 days ago", type: "info" },
  { id: 4, action: "Event rejected", event: "Research Paper Writing Workshop", time: "3 weeks ago", type: "error" },
  { id: 5, action: "Event created (draft)", event: "IoT Innovation Challenge", time: "Today", type: "neutral" },
];
