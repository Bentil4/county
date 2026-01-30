import { Injectable } from '@angular/core';

export interface LetterStat {
  letter: string;
  count: number;
  percent: number;
}

export interface TextMetrics {
  characters: number;
  words: number;
  sentences: number;
  readingMinutes: number;
  letterStats: LetterStat[];
  totalLetters: number;
}

@Injectable({ providedIn: 'root' })
export class TextMetricsService {
  /**
   * Analyzes the given text and returns a TextMetrics object
   * containing information about the text such as character count,
   * word count, sentence count, reading minutes, letter statistics,
   * and total letters.
   *
   * @param text - The text to analyze
   * @param excludeSpaces - If true, exclude whitespace from the analysis
   *
   * @returns A TextMetrics object containing information about the text
   */
  analyze(text: string, excludeSpaces: boolean): TextMetrics {
    const source = excludeSpaces ? text.replace(/\s+/g, '') : text;

    const words = this.countWords(text);
    const sentences = this.countSentences(text);
    const readingMinutes = Math.max(0, Math.ceil(words / 200));

    const map = new Array<number>(26).fill(0);
    let totalLetters = 0;

    for (const ch of text) {
      const code = ch.toUpperCase().charCodeAt(0);
      if (code >= 65 && code <= 90) {
        map[code - 65]++;
        totalLetters++;
      }
    }

    const letterStats: LetterStat[] = map
      .map((count, i) => ({
        letter: String.fromCharCode(65 + i),
        count,
        percent: totalLetters ? count / totalLetters : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      characters: source.length,
      words,
      sentences,
      readingMinutes,
      letterStats,
      totalLetters,
    };
  }

  /**
   * Returns the number of words in the given text.
   * A word is defined as a sequence of characters separated by
   * a word boundary, consisting of unicode letters, digits, hyphen,
   * and apostrophe.
   * If the text is empty, returns 0. If the text contains only whitespace,
   * returns 1.
   * @param text - The text to analyze
   * @returns The number of words in the given text
   */
  private countWords(text: string): number {
    const tokens = text.trim().match(/\b[\p{L}\p{N}'-]+\b/gu) ?? [];
    return tokens.length;
  }

  /**
   * Returns the number of sentences in the given text.
   * A sentence is defined as a sequence of characters separated by
   * a period, exclamation mark, question mark, or whitespace.
   * If the text is empty, returns 0. If the text contains only whitespace,
   * returns 1.
   * @param text - The text to analyze
   * @returns The number of sentences in the given text
   */
  private countSentences(text: string): number {
    const parts = text
      .split(/[.!?]+(?=\s|$)/)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length || (text.trim().length ? 1 : 0);
  }
}
