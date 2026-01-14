/**
 * Personal Development System
 * 
 * Self-improvement mechanics:
 * - Books and reading
 * - Podcasts and audio learning
 * - Courses and certifications
 * - Mentorship connections
 * - Skills development
 */

// ============================================================================
// BOOKS
// ============================================================================

export interface Book {
    id: string;
    title: string;
    author: string;
    category: 'spiritual' | 'business' | 'leadership' | 'psychology' | 'health' | 'controversial';
    cost: number;
    readingWeeks: number;  // How long to complete
    effects: Record<string, number>;
    prerequisite?: string;
    description: string;
}

export const BOOKS: Book[] = [
    // Spiritual books
    {
        id: 'POWER_PRAYER',
        title: 'Power of Midnight Prayer',
        author: 'Dr. D.K. Olukoya',
        category: 'spiritual',
        cost: 3500,
        readingWeeks: 2,
        effects: { prayerPower: 200, anointing: 100 },
        description: 'MFM-style warfare prayers.'
    },
    {
        id: 'LIVING_FAITH',
        title: 'Living Faith',
        author: 'David Oyedepo',
        category: 'spiritual',
        cost: 4000,
        readingWeeks: 3,
        effects: { faith: 150, prosperity: 100 },
        description: 'Prosperity gospel foundation.'
    },
    {
        id: 'PURPOSE_DRIVEN',
        title: 'Purpose Driven Life',
        author: 'Rick Warren',
        category: 'spiritual',
        cost: 5000,
        readingWeeks: 4,
        effects: { anointing: 200, clarity: 100 },
        description: 'Global bestseller. Solid theology.'
    },

    // Business books
    {
        id: 'RICH_DAD',
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        category: 'business',
        cost: 4500,
        readingWeeks: 2,
        effects: { financialIQ: 200, ambition: 100 },
        description: 'Change how you think about money.'
    },
    {
        id: 'THINK_GROW_RICH',
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        category: 'business',
        cost: 3000,
        readingWeeks: 3,
        effects: { ambition: 200, influence: 100 },
        description: 'The classic wealth mindset book.'
    },
    {
        id: 'ZERO_TO_ONE',
        title: 'Zero to One',
        author: 'Peter Thiel',
        category: 'business',
        cost: 6000,
        readingWeeks: 2,
        effects: { innovation: 200, businessSkill: 150 },
        description: 'Silicon Valley thinking for ministry growth.'
    },

    // Leadership
    {
        id: 'LAWS_LEADERSHIP',
        title: '21 Irrefutable Laws of Leadership',
        author: 'John Maxwell',
        category: 'leadership',
        cost: 5500,
        readingWeeks: 4,
        effects: { leadership: 300, influence: 150 },
        description: 'Standard church leadership material.'
    },
    {
        id: 'ANOINTED_LEAD',
        title: 'Anointed to Lead',
        author: 'Archbishop Benson Idahosa',
        category: 'leadership',
        cost: 4000,
        readingWeeks: 3,
        effects: { anointing: 150, leadership: 200 },
        description: 'Nigerian pentecostal leadership.'
    },

    // Psychology
    {
        id: 'CHARISMA',
        title: 'The Charisma Myth',
        author: 'Olivia Fox Cabane',
        category: 'psychology',
        cost: 5000,
        readingWeeks: 2,
        effects: { charisma: 300, fame: 100 },
        description: 'Learn to command a room.'
    },
    {
        id: 'INFLUENCE',
        title: 'Influence: The Psychology of Persuasion',
        author: 'Robert Cialdini',
        category: 'psychology',
        cost: 4500,
        readingWeeks: 3,
        effects: { influence: 300, manipulation: 100 },
        description: 'Understand how to move people.'
    },

    // Controversial
    {
        id: 'GOD_DELUSION',
        title: 'The God Delusion',
        author: 'Richard Dawkins',
        category: 'controversial',
        cost: 6000,
        readingWeeks: 3,
        effects: { doubt: 50, intellectualCredit: 100, scandalRisk: 30 },
        description: 'Know thy enemy. Or question everything.'
    },
    {
        id: '48_LAWS_POWER',
        title: '48 Laws of Power',
        author: 'Robert Greene',
        category: 'controversial',
        cost: 5500,
        readingWeeks: 4,
        effects: { manipulation: 300, influence: 200, anointing: -50 },
        description: 'Machiavellian tactics. Useful but dark.'
    }
];

// ============================================================================
// PODCASTS
// ============================================================================

export interface Podcast {
    id: string;
    name: string;
    host: string;
    category: 'ministry' | 'business' | 'motivation' | 'news' | 'entertainment';
    weeklyListeningHours: number;
    weeklyEffects: Record<string, number>;
    description: string;
}

export const PODCASTS: Podcast[] = [
    // Ministry
    {
        id: 'ELEVATION_WORSHIP',
        name: 'Elevation Church Podcast',
        host: 'Steven Furtick',
        category: 'ministry',
        weeklyListeningHours: 3,
        weeklyEffects: { anointing: 20, preachingSkill: 10 },
        description: 'Contemporary preaching style.'
    },
    {
        id: 'COZA_PODCAST',
        name: 'COZA Church Podcast',
        host: 'Biodun Fatoyinbo',
        category: 'ministry',
        weeklyListeningHours: 2,
        weeklyEffects: { prosperity: 20, controversy: 10 },
        description: 'Nigerian megachurch content.'
    },

    // Business
    {
        id: 'HOW_I_BUILT',
        name: 'How I Built This',
        host: 'Guy Raz',
        category: 'business',
        weeklyListeningHours: 2,
        weeklyEffects: { businessSkill: 15, inspiration: 20 },
        description: 'Founder stories and lessons.'
    },
    {
        id: 'AFROBIZ',
        name: 'AfroBiz Podcast',
        host: 'Various',
        category: 'business',
        weeklyListeningHours: 2,
        weeklyEffects: { businessSkill: 20, networking: 15 },
        description: 'African business insights.'
    },

    // Motivation
    {
        id: 'DIARY_CEO',
        name: 'Diary of a CEO',
        host: 'Steven Bartlett',
        category: 'motivation',
        weeklyListeningHours: 3,
        weeklyEffects: { ambition: 25, mentalHealth: 10 },
        description: 'Deep conversations with achievers.'
    },
    {
        id: 'CHISOM_PODCAST',
        name: 'Nigerian Success Stories',
        host: 'Chisom',
        category: 'motivation',
        weeklyListeningHours: 2,
        weeklyEffects: { inspiration: 20, networking: 10 },
        description: 'Local success stories.'
    },

    // News & Entertainment
    {
        id: 'PULSE_NAIJA',
        name: 'Pulse Nigeria Podcast',
        host: 'Various',
        category: 'news',
        weeklyListeningHours: 1,
        weeklyEffects: { awareness: 15, relevance: 10 },
        description: 'Stay current with Nigerian trends.'
    },
    {
        id: 'NOTJUSTOK',
        name: 'NotJustOk Podcast',
        host: 'Various',
        category: 'entertainment',
        weeklyListeningHours: 2,
        weeklyEffects: { youthRelevance: 20, stress: -10 },
        description: 'Nigerian music and entertainment.'
    }
];

// ============================================================================
// COURSES & CERTIFICATIONS
// ============================================================================

export interface Course {
    id: string;
    name: string;
    provider: string;
    category: 'theology' | 'business' | 'counseling' | 'media' | 'tech';
    cost: number;
    durationWeeks: number;
    certification: boolean;
    effects: Record<string, number>;
    unlocks?: string[];
    description: string;
}

export const COURSES: Course[] = [
    // Theology
    {
        id: 'BIBLE_SCHOOL',
        name: 'Bible School (1 Year)',
        provider: 'RCCG Bible College',
        category: 'theology',
        cost: 500000,
        durationWeeks: 52,
        certification: true,
        effects: { theologySkill: 500, anointing: 300, credibility: 200 },
        unlocks: ['ORDINATION_ELIGIBLE'],
        description: 'Formal theological training.'
    },
    {
        id: 'MASTERS_DIVINITY',
        name: 'Master of Divinity',
        provider: 'Nigerian Baptist Seminary',
        category: 'theology',
        cost: 2000000,
        durationWeeks: 104,
        certification: true,
        effects: { theologySkill: 1000, credibility: 500, influence: 200 },
        unlocks: ['REVEREND_TITLE'],
        description: '2-year advanced theological degree.'
    },

    // Business
    {
        id: 'MBA_LAGOS',
        name: 'Executive MBA',
        provider: 'Lagos Business School',
        category: 'business',
        cost: 8000000,
        durationWeeks: 78,
        certification: true,
        effects: { businessSkill: 800, networking: 500, credibility: 300 },
        unlocks: ['CORPORATE_CONNECTIONS'],
        description: 'Top Nigerian business school.'
    },
    {
        id: 'FINANCE_CERT',
        name: 'Church Finance Management',
        provider: 'Online',
        category: 'business',
        cost: 150000,
        durationWeeks: 8,
        certification: true,
        effects: { financeSkill: 300, trustworthiness: 100 },
        description: 'Manage church finances properly.'
    },

    // Counseling
    {
        id: 'MARRIAGE_COUNSELOR',
        name: 'Marriage Counseling Certification',
        provider: 'RCCG Family Development',
        category: 'counseling',
        cost: 200000,
        durationWeeks: 12,
        certification: true,
        effects: { counselingSkill: 400, marriageAuthority: 200 },
        unlocks: ['WEDDING_OFFICIATING'],
        description: 'Qualify to counsel couples.'
    },
    {
        id: 'TRAUMA_THERAPY',
        name: 'Trauma-Informed Pastoral Care',
        provider: 'International',
        category: 'counseling',
        cost: 350000,
        durationWeeks: 16,
        certification: true,
        effects: { counselingSkill: 500, empathy: 200 },
        description: 'Handle delicate situations properly.'
    },

    // Media
    {
        id: 'SOCIAL_MEDIA',
        name: 'Church Social Media Mastery',
        provider: 'Online',
        category: 'media',
        cost: 80000,
        durationWeeks: 4,
        certification: false,
        effects: { socialMediaSkill: 300, fame: 100 },
        description: 'Grow your online presence.'
    },
    {
        id: 'VIDEO_PRODUCTION',
        name: 'Professional Video Production',
        provider: 'Lagos Film Academy',
        category: 'media',
        cost: 500000,
        durationWeeks: 12,
        certification: true,
        effects: { contentQuality: 400, fame: 200 },
        unlocks: ['YOUTUBE_MONETIZATION'],
        description: 'Create broadcast-quality content.'
    }
];

// ============================================================================
// READING TRACKER
// ============================================================================

export interface ReadingProgress {
    bookId: string;
    startWeek: number;
    currentPage: number;
    totalPages: number;
    completed: boolean;
    completedWeek?: number;
}

export interface DevelopmentState {
    booksRead: string[];
    currentlyReading: ReadingProgress[];
    podcastsSubscribed: string[];
    coursesCompleted: string[];
    currentCourses: Array<{ courseId: string; startWeek: number; progress: number }>;
    totalReadingHours: number;
    skillBoosts: Record<string, number>;
}

/**
 * Progress reading a book
 */
export function progressReading(
    progress: ReadingProgress,
    hoursSpent: number
): ReadingProgress {
    const pagesPerHour = 30;
    const pagesRead = hoursSpent * pagesPerHour;
    const newPage = Math.min(progress.totalPages, progress.currentPage + pagesRead);

    return {
        ...progress,
        currentPage: newPage,
        completed: newPage >= progress.totalPages
    };
}

/**
 * Calculate weekly effects from all development activities
 */
export function calculateWeeklyDevelopmentEffects(
    state: DevelopmentState,
    podcasts: Podcast[]
): Record<string, number> {
    const effects: Record<string, number> = {};

    // Podcast effects
    for (const podcastId of state.podcastsSubscribed) {
        const podcast = podcasts.find(p => p.id === podcastId);
        if (podcast) {
            for (const [key, value] of Object.entries(podcast.weeklyEffects)) {
                effects[key] = (effects[key] || 0) + value;
            }
        }
    }

    // Add accumulated skill boosts
    for (const [key, value] of Object.entries(state.skillBoosts)) {
        effects[key] = (effects[key] || 0) + value;
    }

    return effects;
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createEmptyDevelopmentState(): DevelopmentState {
    return {
        booksRead: [],
        currentlyReading: [],
        podcastsSubscribed: [],
        coursesCompleted: [],
        currentCourses: [],
        totalReadingHours: 0,
        skillBoosts: {}
    };
}

export function getAvailableCourses(
    completedCourses: string[],
    personalCash: number
): Course[] {
    return COURSES.filter(course => {
        if (completedCourses.includes(course.id)) return false;
        if (course.cost > personalCash) return false;
        return true;
    });
}
