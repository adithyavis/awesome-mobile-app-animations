export const DUOLINGO_GREEN = '#58CC02';
export const DUOLINGO_BACKGROUND = '#1F1F1F';
export const DUOLINGO_BORDER = '#3A3A3A';
export const DUOLINGO_TEXT = '#FFFFFF';
export const DUOLINGO_GRAY = '#8E8E8E';
export const DUOLINGO_DARK_GRAY = '#222222';
export const DUOLINGO_SURFACE = '#2A2A2A';

export interface Word {
  id: string;
  text: string;
}

export const WORD_BANK_WORDS = [
  {
    id: '1',
    text: 'am',
  },
  {
    id: '2',
    text: 'I',
  },
  {
    id: '3',
    text: 'React',
  },
  {
    id: '4',
    text: 'Native',
  },
  {
    id: '5',
    text: 'learning',
  },
] as const satisfies Word[];

export const CORRECT_SENTENCE = 'I am learning React Native';

export const WORD_HEIGHT = 50;
export const WORD_HORIZONTAL_MARGIN = 8;
export const WORD_VERTICAL_MARGIN = 10;
export const SENTENCE_ROW_HEIGHT = WORD_HEIGHT + 2 * WORD_VERTICAL_MARGIN;
export const WORD_BANK_HEIGHT = 120;
