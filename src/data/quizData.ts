export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Expert";
  era: string;
  points: number;
  timeLimit: number; // in seconds
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  era: string;
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Expert";
  questions: QuizQuestion[];
  totalPoints: number;
  timeLimit: number;
  cardId?: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  completedAt: Date;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

// Sample quiz data
export const quizDatabase: Quiz[] = [
  {
    id: "quiz-proklamasi",
    title: "Proklamasi Kemerdekaan Indonesia",
    description:
      "Quiz tentang peristiwa proklamasi kemerdekaan Indonesia 17 Agustus 1945",
    era: "Kemerdekaan",
    difficulty: "Mudah",
    totalPoints: 500,
    timeLimit: 600, // 10 minutes
    cardId: "hc001",
    questions: [
      {
        id: "q1",
        question: "Kapan Indonesia memproklamasikan kemerdekaannya?",
        options: [
          "16 Agustus 1945",
          "17 Agustus 1945",
          "18 Agustus 1945",
          "19 Agustus 1945",
        ],
        correctAnswer: 1,
        explanation:
          "Indonesia memproklamasikan kemerdekaan pada tanggal 17 Agustus 1945.",
        difficulty: "Mudah",
        era: "Kemerdekaan",
        points: 100,
        timeLimit: 30,
      },
      {
        id: "q2",
        question:
          "Siapa yang membacakan teks proklamasi kemerdekaan Indonesia?",
        options: [
          "Mohammad Hatta",
          "Soekarno",
          "Soetan Sjahrir",
          "Ahmad Soebardjo",
        ],
        correctAnswer: 1,
        explanation:
          "Soekarno (Ir. Soekarno) yang membacakan teks proklamasi kemerdekaan Indonesia.",
        difficulty: "Mudah",
        era: "Kemerdekaan",
        points: 100,
        timeLimit: 30,
      },
      {
        id: "q3",
        question: "Di mana teks proklamasi kemerdekaan Indonesia dibacakan?",
        options: [
          "Gedung Pancasila",
          "Istana Merdeka",
          "Jalan Pegangsaan Timur No. 56",
          "Gedung Joang 45",
        ],
        correctAnswer: 2,
        explanation:
          "Teks proklamasi dibacakan di Jalan Pegangsaan Timur No. 56, Jakarta (rumah Soekarno).",
        difficulty: "Sedang",
        era: "Kemerdekaan",
        points: 150,
        timeLimit: 45,
      },
      {
        id: "q4",
        question: "Siapa yang mengetik teks proklamasi kemerdekaan Indonesia?",
        options: [
          "Sayuti Melik",
          "Latif Hendraningrat",
          "B.M. Diah",
          "Adam Malik",
        ],
        correctAnswer: 0,
        explanation:
          "Sayuti Melik yang mengetik teks proklamasi kemerdekaan Indonesia.",
        difficulty: "Sulit",
        era: "Kemerdekaan",
        points: 150,
        timeLimit: 45,
      },
    ],
  },
  {
    id: "quiz-majapahit",
    title: "Kerajaan Majapahit",
    description: "Quiz tentang kerajaan besar Majapahit di Jawa Timur",
    era: "Hindu-Buddha",
    difficulty: "Sedang",
    totalPoints: 750,
    timeLimit: 900, // 15 minutes
    cardId: "hc002",
    questions: [
      {
        id: "q5",
        question: "Siapa pendiri Kerajaan Majapahit?",
        options: ["Ken Angrok", "Raden Wijaya", "Hayam Wuruk", "Gajah Mada"],
        correctAnswer: 1,
        explanation:
          "Raden Wijaya adalah pendiri Kerajaan Majapahit pada tahun 1293.",
        difficulty: "Sedang",
        era: "Hindu-Buddha",
        points: 150,
        timeLimit: 45,
      },
      {
        id: "q6",
        question:
          "Siapa Mahapatih terkenal dari Kerajaan Majapahit yang mengucapkan Sumpah Palapa?",
        options: ["Gajah Mada", "Arya Damar", "Nambi", "Ranggalawe"],
        correctAnswer: 0,
        explanation:
          "Gajah Mada adalah Mahapatih Majapahit yang terkenal dengan Sumpah Palapa.",
        difficulty: "Mudah",
        era: "Hindu-Buddha",
        points: 100,
        timeLimit: 30,
      },
      {
        id: "q7",
        question:
          "Pada masa raja mana Kerajaan Majapahit mencapai puncak kejayaannya?",
        options: [
          "Raden Wijaya",
          "Jayanegara",
          "Hayam Wuruk",
          "Wikramawardhana",
        ],
        correctAnswer: 2,
        explanation:
          "Majapahit mencapai puncak kejayaan pada masa pemerintahan Hayam Wuruk (1350-1389).",
        difficulty: "Sedang",
        era: "Hindu-Buddha",
        points: 150,
        timeLimit: 45,
      },
      {
        id: "q8",
        question:
          "Apa nama kitab yang menceritakan tentang Kerajaan Majapahit?",
        options: ["Negarakertagama", "Pararaton", "Sutasoma", "Arjunawijaya"],
        correctAnswer: 0,
        explanation:
          "Negarakertagama adalah kitab karya Mpu Prapanca yang menceritakan kejayaan Majapahit.",
        difficulty: "Sulit",
        era: "Hindu-Buddha",
        points: 200,
        timeLimit: 60,
      },
      {
        id: "q9",
        question:
          "Di provinsi mana saat ini lokasi bekas Kerajaan Majapahit berada?",
        options: ["Jawa Tengah", "Jawa Timur", "Jawa Barat", "Yogyakarta"],
        correctAnswer: 1,
        explanation:
          "Bekas Kerajaan Majapahit berada di Jawa Timur, tepatnya di daerah Mojokerto dan sekitarnya.",
        difficulty: "Mudah",
        era: "Hindu-Buddha",
        points: 150,
        timeLimit: 30,
      },
    ],
  },
  {
    id: "quiz-diponegoro",
    title: "Perang Diponegoro",
    description: "Quiz tentang perang Pangeran Diponegoro melawan Belanda",
    era: "Kolonial",
    difficulty: "Sulit",
    totalPoints: 1000,
    timeLimit: 1200, // 20 minutes
    cardId: "hc003",
    questions: [
      {
        id: "q10",
        question: "Dalam periode tahun berapa Perang Diponegoro berlangsung?",
        options: ["1825-1830", "1825-1829", "1824-1830", "1826-1830"],
        correctAnswer: 0,
        explanation:
          "Perang Diponegoro berlangsung dari tahun 1825 hingga 1830.",
        difficulty: "Sedang",
        era: "Kolonial",
        points: 150,
        timeLimit: 45,
      },
      {
        id: "q11",
        question: "Apa nama asli Pangeran Diponegoro?",
        options: [
          "Raden Mas Antawirya",
          "Raden Mas Mustahar",
          "Raden Mas Ontowiryo",
          "Raden Mas Sujono",
        ],
        correctAnswer: 2,
        explanation:
          "Nama asli Pangeran Diponegoro adalah Raden Mas Ontowiryo.",
        difficulty: "Sulit",
        era: "Kolonial",
        points: 200,
        timeLimit: 60,
      },
      {
        id: "q12",
        question: "Apa yang menjadi pemicu utama Perang Diponegoro?",
        options: [
          "Pemasangan patok jalan oleh Belanda di tanah makam leluhur",
          "Peningkatan pajak tanah",
          "Campur tangan Belanda dalam suksesi tahta",
          "Semua jawaban benar",
        ],
        correctAnswer: 3,
        explanation:
          "Perang Diponegoro dipicu oleh berbagai faktor termasuk pemasangan patok jalan, pajak tinggi, dan campur tangan politik Belanda.",
        difficulty: "Sulit",
        era: "Kolonial",
        points: 250,
        timeLimit: 75,
      },
      {
        id: "q13",
        question:
          "Siapa Jenderal Belanda yang berhasil menangkap Pangeran Diponegoro?",
        options: [
          "Jenderal De Kock",
          "Jenderal Van den Bosch",
          "Jenderal Daendels",
          "Jenderal Raffles",
        ],
        correctAnswer: 0,
        explanation:
          "Jenderal De Kock yang berhasil menangkap Pangeran Diponegoro melalui tipu muslihat dalam perundingan.",
        difficulty: "Sulit",
        era: "Kolonial",
        points: 200,
        timeLimit: 60,
      },
      {
        id: "q14",
        question: "Di mana Pangeran Diponegoro diasingkan setelah ditangkap?",
        options: [
          "Menado, Sulawesi Utara",
          "Makassar, Sulawesi Selatan",
          "Ambon, Maluku",
          "Banda Neira, Maluku",
        ],
        correctAnswer: 1,
        explanation:
          "Pangeran Diponegoro diasingkan ke Makassar, Sulawesi Selatan hingga wafat pada tahun 1855.",
        difficulty: "Expert",
        era: "Kolonial",
        points: 200,
        timeLimit: 60,
      },
    ],
  },
];

// Helper functions
export const getQuizById = (id: string): Quiz | undefined => {
  return quizDatabase.find((quiz) => quiz.id === id);
};

export const getQuizByCardId = (cardId: string): Quiz | undefined => {
  return quizDatabase.find((quiz) => quiz.cardId === cardId);
};

export const getQuizzesByDifficulty = (difficulty: string): Quiz[] => {
  return quizDatabase.filter((quiz) => quiz.difficulty === difficulty);
};

export const getQuizzesByEra = (era: string): Quiz[] => {
  return quizDatabase.filter((quiz) => quiz.era === era);
};
