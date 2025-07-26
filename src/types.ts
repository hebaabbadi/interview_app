export interface FieldOption {
  value: string;
  label: string;
}

export interface DifficultyOption {
  value: number;
  label: string;
}

export interface QuizResult {
  scores: Record<string, number>;
  recommendation: string;
  nextLevel?: boolean;
  currentLevel: number;
}
