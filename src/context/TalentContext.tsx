import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the Talent interface
export interface Talent {
  id: number;
  name: string;
  profession: string;
  location: string;
  experience: string;
  skills: string[];
  about: string;
  image: string;
  resumeFile?: File;
}

// Initial talent data
const initialTalents: Talent[] = [
  {
    id: 1,
    name: 'Sarah Lim',
    profession: 'Graphic Designer',
    location: 'Singapore',
    experience: '3 years',
    skills: ['Adobe Photoshop', 'Illustrator', 'Branding'],
    about: 'Creative designer passionate about helping non-profits and startups build their brand.',
    image: 'designer-symbol'
  },
  {
    id: 2,
    name: 'John Tan',
    profession: 'Web Developer',
    location: 'Singapore',
    experience: '5 years',
    skills: ['React', 'Node.js', 'TypeScript'],
    about: 'Experienced developer seeking freelance and part-time opportunities.',
    image: 'developer-symbol'
  },
  {
    id: 3,
    name: 'Priya Singh',
    profession: 'Project Coordinator',
    location: 'Singapore',
    experience: '2 years',
    skills: ['Event Planning', 'Teamwork', 'Communication'],
    about: 'Organized and detail-oriented, passionate about community projects.',
    image: 'coordinator-symbol'
  },
  {
    id: 4,
    name: 'Marcus Lee',
    profession: 'Customer Service Specialist',
    location: 'Singapore',
    experience: '4 years',
    skills: ['Customer Support', 'CRM', 'Problem Solving'],
    about: 'Friendly and patient, with a passion for helping people solve problems.',
    image: 'customer-service-symbol'
  },
  {
    id: 5,
    name: 'Aisha Rahman',
    profession: 'Content Writer',
    location: 'Singapore',
    experience: '3 years',
    skills: ['Copywriting', 'SEO', 'Blogging'],
    about: 'Creative storyteller with a knack for digital content and outreach.',
    image: 'writer-symbol'
  },
  {
    id: 6,
    name: 'Wei Ming',
    profession: 'Data Analyst',
    location: 'Singapore',
    experience: '2 years',
    skills: ['Excel', 'Python', 'Data Visualization'],
    about: 'Detail-oriented analyst who loves turning data into actionable insights.',
    image: 'analyst-symbol'
  }
];

// Define the context types
interface TalentContextType {
  talents: Talent[];
  addTalent: (talent: Omit<Talent, 'id'>) => void;
  updateTalent: (id: number, talent: Partial<Talent>) => void;
  removeTalent: (id: number) => void;
}

// Create the context
export const TalentContext = createContext<TalentContextType | undefined>(undefined);

// Custom hook to use the talent context
export const useTalent = (): TalentContextType => {
  const context = useContext(TalentContext);
  if (!context) {
    throw new Error('useTalent must be used within a TalentProvider');
  }
  return context;
};

interface TalentProviderProps {
  children: ReactNode;
}

// Provider component
export const TalentProvider: React.FC<TalentProviderProps> = ({ children }) => {
  // Load talents from localStorage if available, otherwise use initialTalents
  const loadTalents = (): Talent[] => {
    const savedTalents = localStorage.getItem('xtalents_profiles');
    return savedTalents ? JSON.parse(savedTalents) : initialTalents;
  };

  const [talents, setTalents] = useState<Talent[]>(loadTalents());

  // Save talents to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('xtalents_profiles', JSON.stringify(talents));
  }, [talents]);

  // Add a new talent
  const addTalent = (talent: Omit<Talent, 'id'>) => {
    const newId = talents.length > 0 ? Math.max(...talents.map(t => t.id)) + 1 : 1;
    setTalents([...talents, { ...talent, id: newId }]);
  };

  // Update an existing talent
  const updateTalent = (id: number, updatedTalent: Partial<Talent>) => {
    setTalents(talents.map(talent => 
      talent.id === id ? { ...talent, ...updatedTalent } : talent
    ));
  };

  // Remove a talent
  const removeTalent = (id: number) => {
    setTalents(talents.filter(talent => talent.id !== id));
  };

  return (
    <TalentContext.Provider value={{ talents, addTalent, updateTalent, removeTalent }}>
      {children}
    </TalentContext.Provider>
  );
};
