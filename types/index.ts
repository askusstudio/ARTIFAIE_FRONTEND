export type UserRole = 'Admin' | 'Manager' | 'Employee';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  assignedTo: string;
  assignedToName: string;
  category: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FilterChip {
  id: string;
  label: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'task' | 'announcement' | 'reminder' | 'alert';
    isRead: boolean;
    createdAt: string; // ISO date string
    relatedTaskId?: string;
  }
  
  export type NotificationFilter = 'today' | 'week' | 'month' | 'all';  

  export interface Employee {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    department: string;
    phone: string;
    joinDate: string;
    status: 'active' | 'inactive';
    tasksCompleted: number;
    tasksAssigned: number;
  }
  
  export interface Client {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    projectType: string;
    joinDate: string;
    totalProjects: number;
  }
  
  export type Priority = 'low' | 'medium' | 'high' | 'urgent';