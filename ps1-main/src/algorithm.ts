/* Copyright (c) 2021-2024 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

import assert from 'assert';
import { Flashcard, AnswerDifficulty } from './flashcards.js';
import * as utils from './utils.js';

/**
 * Reorganize learning buckets from a map representation to a list-of-sets
 * representation.
 *
 * @param bucketMap maps each flashcard to a (nonnegative integer) bucket number
 * 
 * @returns a list of disjoint sets whose union is the set of cards in
 *          bucketMap, and where list[i] is the set of cards that
 *          bucketMap maps to i, for all i in [0, list.length).
 */
export function toBucketSets(bucketMap: Map<Flashcard, number>): Array<Set<Flashcard>> {
    let arr: Array<Set<Flashcard>> = new Array();
    for (const [key, value] of bucketMap){
        while (arr.length <= value){
            arr.push(new Set());
        }
        arr[value].add(key);
    }
    return arr;
}

/**
 * Find a minimal range of bucket numbers covering a list of learning buckets.
 * 
 * @param buckets a list of disjoint sets representing learning buckets, where
 *                buckets[i] is the set of cards in the ith bucket,
 *                for all 0 <= i < buckets.length.
 * 
 * @returns a pair of integers [low, high], 0 <= low <= high, such that every
 *          card in buckets has an integer bucket number in the range [low...high]
 *          inclusive, and high - low is as small as possible
 */
export function getBucketRange(buckets: Array<Set<Flashcard>>): Array<number> {
    let lower = Infinity;
    let upper = -Infinity;
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].size != 0) {
            lower = Math.min(lower, i);
            upper = Math.max(lower,i);
        }
    }
    return [lower, upper];
}

/**
 * Generate a sequence of flashcards for practice on a particular day.
 *
 * @param day day of the learning process. Must be integer >= 1.
 * 
 * @param buckets a list of disjoint sets representing learning buckets,
 *                where buckets[i] is the set of cards in the ith bucket
 *                for all 0 <= i <= retiredBucket
 * 
 * @param retiredBucket number of retired bucket. Must be an integer >= 0.
 * 
 * @returns a sequence of flashcards such that a card appears in the sequence if
 *          and only if its bucket number is some i < retiredBucket such that
 *          `day` is divisible by 2^i
 */
export function practice(day: number, buckets: Array<Set<Flashcard>>, retiredBucket: number): Array<Flashcard> {
    let ans: Array<Flashcard> = new Array();
    for (let i = 0; i < buckets.length; i++) {
        if (day % Math.pow(2, i) == 0) {
            for (const flashcards of buckets[i]) {
                ans.push(flashcards);
            }
        }
    }
    return ans;
}

/**
 * Update step for the Modified-Leitner algorithm.
 * 
 * @param card a flashcard the user just saw
 * 
 * @param answer the difficulty of the user's answer to the flashcard
 * 
 * @param bucketMap represents learning buckets before the flashcard was seen.
 *                  Maps each flashcard in the map to a nonnegative integer 
 *                  bucket number in the range [0...retiredBucket] inclusive.
 *                  Mutated by this method to put `card` in the appropriate bucket,
 *                  as determined by the Modified-Leitner algorithm.
 * 
 * @param retiredBucket number of retired bucket. Must be an integer >= 0.
 */
export function update(card: Flashcard, answer: AnswerDifficulty, bucketMap: Map<Flashcard, number>, retiredBucket: number): void {
    throw new Error("not implemented yet");
}

/**
 * Generate a hint about the back of a flashcard, to display if the user asks for it.
 * 
 * For a language-vocabulary flashcard with a word or phrase in one language on front and a
 * word or phrase in another language on back, the hint is the back with about half of the
 * letters hidden by underscores.
 * 
 * @param card a flashcard.  Must be an X-to-English flashcard.
 * @returns a hint providing some (but not all) of the information from the back of the card,
 *          as described above, or undefined if no hint can be generated for this card.
 */
export function getHint(card: Flashcard): string|undefined {
    throw new Error("not implemented yet");
}

/**
 * TODO
 */
export function computeProgress(/* TODO */) /* TODO */ {
    throw new Error("not implemented yet");
}
