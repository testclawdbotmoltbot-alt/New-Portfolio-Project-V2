import type { Section } from '@/contexts/ContentContext';
import { presetThemes } from '@/contexts/ContentContext';

export const generateDemoData = () => {
  const demoSections: Section[] = [
    {
      id: 'hero',
      type: 'hero',
      title: 'Hero Section',
      order: 0,
      isVisible: true,
      content: {
        name: 'Alex Morgan',
        title: 'Digital Technology Analyst',
        description: 'Transforming complex data into actionable intelligence. Specializing in AI-driven analytics, cloud architecture, and digital innovation.',
        ctaPrimary: 'Explore My Work',
        ctaSecondary: 'Get In Touch',
        imageUrl: '',
        sectionHeading: ''
      }
    },
    {
      id: 'about',
      type: 'about',
      title: 'About Section',
      order: 1,
      isVisible: true,
      content: {
        bio: 'I\'m a passionate digital analyst with a track record of delivering data-driven solutions. With expertise in cloud technologies and AI/ML applications, I help organizations optimize their operations and unlock new opportunities.',
        stats: [
          { label: 'Years Experience', value: '5+' },
          { label: 'Projects Completed', value: '50+' },
          { label: 'Happy Clients', value: '30+' },
          { label: 'Awards Won', value: '8' }
        ],
        profileImage: '',
        sectionHeading: 'ABOUT_ME'
      }
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills Section',
      order: 2,
      isVisible: true,
      content: {
        items: [
          { id: 'skill-1', name: 'Data Analytics', level: 95, icon: '📊', category: 'Analytics' },
          { id: 'skill-2', name: 'Python', level: 90, icon: '🐍', category: 'Development' },
          { id: 'skill-3', name: 'SQL', level: 92, icon: '🗄️', category: 'Database' },
          { id: 'skill-4', name: 'AWS', level: 88, icon: '☁️', category: 'Cloud' },
          { id: 'skill-5', name: 'Machine Learning', level: 85, icon: '🤖', category: 'AI/ML' },
          { id: 'skill-6', name: 'Tableau', level: 89, icon: '📈', category: 'Analytics' }
        ],
        categories: [
          { name: 'Analytics', skills: ['Data Analytics', 'Tableau', 'Statistics'] },
          { name: 'Development', skills: ['Python', 'JavaScript', 'TypeScript'] },
          { name: 'Cloud', skills: ['AWS', 'Azure', 'GCP'] },
          { name: 'Database', skills: ['SQL', 'NoSQL', 'MongoDB'] },
          { name: 'AI/ML', skills: ['Machine Learning', 'Deep Learning', 'NLP'] }
        ],
        sectionHeading: 'TECHNICAL_SKILLS'
      }
    },
    {
      id: 'projects',
      type: 'projects',
      title: 'Projects Section',
      order: 3,
      isVisible: true,
      content: {
        items: [
          {
            id: 'proj-1',
            title: 'AI Analytics Platform',
            shortDesc: 'Enterprise analytics platform powered by machine learning',
            description: 'Built a comprehensive analytics platform that leverages machine learning to predict trends and provide actionable insights. Reduced analysis time by 60%.',
            image: '',
            tech: ['Python', 'TensorFlow', 'AWS', 'React'],
            impact: '60% efficiency increase',
            status: 'Completed'
          },
          {
            id: 'proj-2',
            title: 'Cloud Migration Project',
            shortDesc: 'Migrated legacy systems to cloud infrastructure',
            description: 'Orchestrated migration of 50+ microservices to cloud. Achieved 40% cost reduction and improved system reliability.',
            image: '',
            tech: ['AWS', 'Docker', 'Kubernetes', 'SQL'],
            impact: '40% cost reduction',
            status: 'Completed'
          },
          {
            id: 'proj-3',
            title: 'Real-time Data Dashboard',
            shortDesc: 'Interactive dashboard for real-time business metrics',
            description: 'Developed real-time dashboard with WebSocket integration. Processes 1M+ data points per second.',
            image: '',
            tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
            impact: '1M+ data points/sec',
            status: 'Completed'
          }
        ],
        sectionHeading: 'FEATURED_PROJECTS'
      }
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Experience Section',
      order: 4,
      isVisible: true,
      content: {
        items: [
          {
            id: 'exp-1',
            title: 'Senior Data Analyst',
            company: 'Tech Innovations Inc',
            location: 'San Francisco, CA',
            period: '2022 - Present',
            type: 'FULL_TIME',
            description: 'Lead data analytics initiatives for enterprise clients. Manage team of 3 junior analysts.',
            achievements: [
              'Delivered 15+ analytics solutions',
              'Improved model accuracy by 35%',
              'Mentored junior team members'
            ],
            tech: ['Python', 'SQL', 'Tableau', 'AWS']
          },
          {
            id: 'exp-2',
            title: 'Data Analyst',
            company: 'Digital Solutions Ltd',
            location: 'New York, NY',
            period: '2020 - 2022',
            type: 'FULL_TIME',
            description: 'Performed data analysis and created reports for stakeholders.',
            achievements: [
              'Automated 10+ manual processes',
              'Created 50+ dashboards',
              'Increased data literacy in organization'
            ],
            tech: ['Python', 'MySQL', 'Excel', 'Power BI']
          },
          {
            id: 'exp-3',
            title: 'Junior Analyst',
            company: 'Analytics First',
            location: 'Boston, MA',
            period: '2019 - 2020',
            type: 'FULL_TIME',
            description: 'Started career in data analytics, supporting senior analysts.',
            achievements: [
              'Completed 20+ analysis projects',
              'Earned Python certification',
              'Built first ML model'
            ],
            tech: ['Excel', 'SQL', 'Python', 'Tableau']
          }
        ],
        sectionHeading: 'WORK_EXPERIENCE'
      }
    },
    {
      id: 'testimonials',
      type: 'testimonials',
      title: 'Testimonials Section',
      order: 5,
      isVisible: true,
      content: {
        items: [
          {
            id: 'test-1',
            quote: 'Alex\'s analytical expertise transformed our business decisions. The insights provided were invaluable.',
            author: 'Sarah Johnson',
            role: 'CEO',
            company: 'Tech Innovations Inc'
          },
          {
            id: 'test-2',
            quote: 'Professional, thorough, and delivers results. Highly recommend for any data analytics project.',
            author: 'Michael Chen',
            role: 'CTO',
            company: 'Digital Solutions Ltd'
          },
          {
            id: 'test-3',
            quote: 'Exceptional problem-solving skills and attention to detail. A true asset to any team.',
            author: 'Emma Wilson',
            role: 'Project Manager',
            company: 'Analytics First'
          }
        ],
        sectionHeading: 'CLIENT_TESTIMONIALS'
      }
    },
    {
      id: 'contact',
      type: 'contact',
      title: 'Contact Section',
      order: 6,
      isVisible: true,
      content: {
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        sectionHeading: 'GET_IN_TOUCH'
      }
    }
  ];

  return {
    sections: demoSections,
    theme: presetThemes[0], // Cyberpunk theme
    site: {
      siteName: 'ALEX.MORGAN',
      tagline: 'DIGITAL_ANALYST.exe',
      logoUrl: '',
      layoutDefaults: {
        alignment: 'center' as const,
        width: 'contained' as const,
        fullHeight: false,
        mobileCenter: true
      }
    },
    navigation: {
      items: [
        { label: 'HOME', href: '#hero', isVisible: true },
        { label: 'PROFILE', href: '#about', isVisible: true },
        { label: 'MODULES', href: '#skills', isVisible: true },
        { label: 'ARCHIVES', href: '#projects', isVisible: true },
        { label: 'LOG', href: '#experience', isVisible: true },
        { label: 'DATA', href: '#testimonials', isVisible: true },
        { label: 'CONNECT', href: '#contact', isVisible: true }
      ],
      ctaLabel: 'INITIATE',
      adminLabel: 'ADMIN'
    },
    footer: {
      brandName: 'ALEX.MORGAN',
      tagline: 'DIGITAL_ANALYST.exe',
      aboutText: 'Transforming raw data into intelligent decisions. Specializing in AI-driven analytics and digital transformation.',
      copyrightPrefix: '©',
      builtWithText: 'BUILT_WITH REACT + TAILWIND',
      navLinks: [
        { label: 'HOME', href: '#hero' },
        { label: 'PROFILE', href: '#about' },
        { label: 'MODULES', href: '#skills' },
        { label: 'ARCHIVES', href: '#projects' }
      ],
      systemLinks: [
        { label: 'DATA_ANALYTICS', href: '#skills' },
        { label: 'CLOUD_ARCH', href: '#skills' },
        { label: 'AI_ML', href: '#skills' },
        { label: 'SECURITY', href: '#skills' }
      ],
      socialLinks: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'Discord', href: 'https://discord.com' }
      ],
      statusRows: [
        { label: 'UPTIME', value: '99.99%' },
        { label: 'LATENCY', value: '12ms' },
        { label: 'ENCRYPTION', value: 'AES-256' },
        { label: 'VERSION', value: 'v2.0.26' }
      ]
    }
  };
};
