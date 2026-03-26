export type EventStatus = "pending" | "approved" | "rejected" | "draft";
export type EventCategory = "Technical" | "Cultural" | "Sports" | "Workshop" | "Seminar" | "Fest";
export type EventBanner =
  | "brain"
  | "mask"
  | "laptop"
  | "lock"
  | "cloud"
  | "file"
  | "trophy"
  | "rocket";

export interface AdminEvent {
  id: string;
  title: string;
  category: EventCategory;
  faculty: string;
  facultyDept: string;
  facultyEmail: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  isOnline: boolean;
  description: string;
  maxParticipants: number;
  registeredCount: number;
  status: EventStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectedReason?: string;
  budget?: number;
  tags: string[];
  banner: EventBanner;
  gradient: string;
  coordinators: string[];
  priority: "high" | "normal" | "low";
}

export const allEvents: AdminEvent[] = [
  {
    id: "EVT-001",
    title: "National Symposium on Deep Learning",
    category: "Technical",
    faculty: "Dr. Priya Nair",
    facultyDept: "CSE",
    facultyEmail: "priya.nair@college.edu",
    date: "2025-04-10", endDate: "2025-04-11",
    time: "09:30 AM",
    venue: "Seminar Hall A, Block 3",
    isOnline: false,
    description: "Two-day national symposium covering deep learning architectures, transformers, and real-world deployment with invited IIT speakers.",
    maxParticipants: 300, registeredCount: 214,
    status: "pending",
    submittedAt: "2025-03-07T10:20:00",
    budget: 45000,
    tags: ["AI", "Deep Learning", "Research"],
    banner: "brain",
    gradient: "from-[#1e3a8a] to-[#1d4ed8]",
    coordinators: ["Dr. Priya Nair", "Mr. Suresh Iyer"],
    priority: "high",
  },
  {
    id: "EVT-002",
    title: "Annual Cultural Fiesta",
    category: "Cultural",
    faculty: "Prof. Rekha Menon",
    facultyDept: "Arts",
    facultyEmail: "rekha.menon@college.edu",
    date: "2025-04-20",
    time: "05:00 PM",
    venue: "Open Air Theatre",
    isOnline: false,
    description: "Vibrant celebration of arts, dance, music and creativity from students across all departments.",
    maxParticipants: 800, registeredCount: 312,
    status: "pending",
    submittedAt: "2025-03-06T14:10:00",
    budget: 80000,
    tags: ["Dance", "Music", "Art", "Inter-department"],
    banner: "mask",
    gradient: "from-[#7c2d78] to-[#c026d3]",
    coordinators: ["Prof. Rekha Menon"],
    priority: "high",
  },
  {
    id: "EVT-003",
    title: "Full-Stack Dev Bootcamp",
    category: "Workshop",
    faculty: "Prof. Kavitha Reddy",
    facultyDept: "CSE",
    facultyEmail: "kavitha.reddy@college.edu",
    date: "2025-04-22",
    time: "10:00 AM",
    venue: "Computer Lab 2 & 3",
    isOnline: false,
    description: "3-day hands-on bootcamp on React, Node.js, MongoDB and AWS deployment. Industry mentors included.",
    maxParticipants: 60, registeredCount: 58,
    status: "approved",
    submittedAt: "2025-03-02T09:00:00",
    reviewedAt: "2025-03-07T11:30:00",
    reviewedBy: "Admin",
    budget: 12000,
    tags: ["Web Dev", "React", "Node.js"],
    banner: "laptop",
    gradient: "from-[#065f46] to-[#059669]",
    coordinators: ["Prof. Kavitha Reddy"],
    priority: "normal",
  },
  {
    id: "EVT-004",
    title: "Cybersecurity Awareness Drive",
    category: "Seminar",
    faculty: "Dr. Ramesh Sharma",
    facultyDept: "IT",
    facultyEmail: "ramesh.sharma@college.edu",
    date: "2025-05-03",
    time: "02:00 PM",
    venue: "Main Auditorium",
    isOnline: false,
    description: "Awareness seminar on ethical hacking, data privacy, social engineering and digital safety.",
    maxParticipants: 400, registeredCount: 187,
    status: "pending",
    submittedAt: "2025-03-07T16:45:00",
    budget: 20000,
    tags: ["Cybersecurity", "Privacy", "Ethical Hacking"],
    banner: "lock",
    gradient: "from-[#7c2d12] to-[#ea580c]",
    coordinators: ["Dr. Ramesh Sharma", "Ms. Deepika Pillai"],
    priority: "normal",
  },
  {
    id: "EVT-005",
    title: "Cloud Computing Masterclass",
    category: "Workshop",
    faculty: "Prof. Anand Krishnan",
    facultyDept: "CSE",
    facultyEmail: "anand.krishnan@college.edu",
    date: "2025-05-15",
    time: "11:00 AM",
    venue: "Online (Google Meet)",
    isOnline: true,
    description: "Live online masterclass on AWS, Azure, and GCP fundamentals with certification prep tips.",
    maxParticipants: 500, registeredCount: 320,
    status: "approved",
    submittedAt: "2025-03-09T08:00:00",
    reviewedAt: "2025-03-09T14:00:00",
    reviewedBy: "Admin",
    budget: 5000,
    tags: ["Cloud", "AWS", "Azure"],
    banner: "cloud",
    gradient: "from-[#1e40af] to-[#7c3aed]",
    coordinators: ["Prof. Anand Krishnan"],
    priority: "low",
  },
  {
    id: "EVT-006",
    title: "Research Paper Writing Workshop",
    category: "Workshop",
    faculty: "Dr. Meena Sundaram",
    facultyDept: "CSE",
    facultyEmail: "meena.sundaram@college.edu",
    date: "2025-03-20",
    time: "03:00 PM",
    venue: "Seminar Hall B",
    isOnline: false,
    description: "Workshop for final year students on IEEE/Springer-format research papers with LaTeX practice.",
    maxParticipants: 50, registeredCount: 50,
    status: "rejected",
    submittedAt: "2025-02-12T11:00:00",
    reviewedAt: "2025-02-15T10:00:00",
    reviewedBy: "Admin",
    rejectedReason: "Scheduling conflict with department examinations. Please reschedule to April 2025.",
    budget: 8000,
    tags: ["Research", "LaTeX", "Academic Writing"],
    banner: "file",
    gradient: "from-[#4a1d96] to-[#7c3aed]",
    coordinators: ["Dr. Meena Sundaram"],
    priority: "low",
  },
  {
    id: "EVT-007",
    title: "Inter-College Sports Meet 2025",
    category: "Sports",
    faculty: "Mr. Vijay Kumar",
    facultyDept: "Physical Education",
    facultyEmail: "vijay.kumar@college.edu",
    date: "2025-05-20", endDate: "2025-05-22",
    time: "08:00 AM",
    venue: "College Sports Ground",
    isOnline: false,
    description: "Annual inter-college sports meet covering cricket, football, basketball, and athletics across 12 colleges.",
    maxParticipants: 600, registeredCount: 0,
    status: "pending",
    submittedAt: "2025-03-08T12:00:00",
    budget: 150000,
    tags: ["Cricket", "Football", "Basketball", "Athletics"],
    banner: "trophy",
    gradient: "from-[#713f12] to-[#ca8a04]",
    coordinators: ["Mr. Vijay Kumar", "Ms. Anitha Raj"],
    priority: "high",
  },
  {
    id: "EVT-008",
    title: "Entrepreneurship & Startup Fest",
    category: "Fest",
    faculty: "Prof. Sindhu Varma",
    facultyDept: "MBA",
    facultyEmail: "sindhu.varma@college.edu",
    date: "2025-06-01", endDate: "2025-06-02",
    time: "09:00 AM",
    venue: "Innovation Hub, Block 5",
    isOnline: false,
    description: "2-day startup fest with idea pitching, investor panels, workshops on funding and go-to-market strategy.",
    maxParticipants: 250, registeredCount: 0,
    status: "draft",
    submittedAt: "2025-03-09T15:30:00",
    budget: 60000,
    tags: ["Startup", "Pitch", "Funding", "Innovation"],
    banner: "rocket",
    gradient: "from-[#064e3b] to-[#0d9488]",
    coordinators: ["Prof. Sindhu Varma", "Dr. Rajan Pillai"],
    priority: "normal",
  },
];

export const adminProfile = {
  name: "Dr. S. Krishnamurthy",
  role: "Principal / Admin",
  initials: "SK",
  email: "admin@college.edu",
};

export const systemStats = {
  totalEvents: allEvents.length,
  pending: allEvents.filter(e => e.status === "pending").length,
  approved: allEvents.filter(e => e.status === "approved").length,
  rejected: allEvents.filter(e => e.status === "rejected").length,
  draft: allEvents.filter(e => e.status === "draft").length,
  totalFaculty: 5,
  totalStudentRegistrations: allEvents.reduce((s, e) => s + e.registeredCount, 0),
  totalBudget: allEvents.reduce((s, e) => s + (e.budget ?? 0), 0),
};

export const recentActions = [
  { id:1, action:"Approved", event:"Full-Stack Dev Bootcamp", faculty:"Prof. Kavitha Reddy", time:"2 days ago", type:"approve" },
  { id:2, action:"Approved", event:"Cloud Computing Masterclass", faculty:"Prof. Anand Krishnan", time:"Today, 2:00 PM", type:"approve" },
  { id:3, action:"Rejected", event:"Research Paper Writing Workshop", faculty:"Dr. Meena Sundaram", time:"3 weeks ago", type:"reject" },
];
