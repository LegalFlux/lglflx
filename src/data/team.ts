import { TeamMember } from '../types/team';

// Mock Team Members
export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Paulo Carvalho',
    email: 'paulo.carvalho@escritorio.com',
    role: 'attorney',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    phone: '(11) 99876-5432',
    specialties: ['civil', 'corporate'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Dra. Luciana Mendes',
    email: 'luciana.mendes@escritorio.com',
    role: 'attorney',
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    phone: '(11) 98765-4321',
    specialties: ['criminal', 'labor'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Fernanda Santos',
    email: 'fernanda.santos@escritorio.com',
    role: 'paralegal',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    phone: '(11) 97654-3210',
    status: 'active',
  },
  {
    id: '4',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@escritorio.com',
    role: 'assistant',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    phone: '(11) 96543-2109',
    status: 'active',
  },
  {
    id: '5',
    name: 'Márcia Oliveira',
    email: 'marcia.oliveira@escritorio.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    phone: '(11) 95432-1098',
    status: 'active',
  },
];
