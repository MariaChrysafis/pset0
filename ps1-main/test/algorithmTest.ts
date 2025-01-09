/* Copyright (c) 2021-2024 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

import assert from 'assert';
import { AnswerDifficulty, Flashcard } from '../src/flashcards.js';
import { toBucketSets, getBucketRange, practice, update, getHint, computeProgress } from '../src/algorithm.js';

/*
 * Warning: all the tests you write in this file must be runnable against any
 * implementations that follow the spec. Your tests will be run against several staff
 * implementations.
 * 
 * DO NOT strengthen the spec of any of the tested functions (except getHint, as
 * described in the ps1 handout).
 * 
 * In particular, your test cases must not call helper functions of your own that
 * you have put in algorithms.ts or any other file in src/, except for utils.ts.
 */

describe('toBucketSets', function() {
    /*
     * TODO: your testing strategy for this function should go here.
     * 
     * See the Testing reading for examples of what a testing strategy comment looks
     * like. Make sure you have partitions.
     */

    // TODO: when you write your own test, state the partitions that the test covers
    // in between the quotes, like this one
    it('covers two cards in different buckets', function() {
        const map:Map<Flashcard, number> = new Map([
                    [Flashcard.make("sairina", "magic"), 0],
                    [Flashcard.make("lavaralda", "tree"), 1]]);
        const buckets:Array<Set<Flashcard>> = toBucketSets(map);
        assert.deepStrictEqual(buckets[0], new Set([Flashcard.make("sairina", "magic")]), "expected correct bucket contents");
        assert.deepStrictEqual(buckets[1], new Set([Flashcard.make("lavaralda", "tree")]), "expected correct bucket contents");
        for (let i = 2; i < buckets.length; ++i) {
            assert.strictEqual(buckets[i].size, 0, "expected other buckets to be empty");
        }
    });

});

describe('getBucketRange', function() {
    /*
     * TODO: your testing strategy for this function should go here.
     * 
     * See the Testing reading for examples of what a testing strategy comment looks
     * like. Make sure you have partitions.
     */

    // TODO: when you write your own test, state the partitions that the test covers
    // in between the quotes, like this one
    it('covers two adjacent buckets', function() {
        const buckets:Array<Set<Flashcard>> = [
                    new Set([Flashcard.make("sehen", "see")]),
                    new Set([Flashcard.make("gehen", "go")])
                ];
        const range:Array<number> = getBucketRange(buckets);
        assert.strictEqual(range.length, 2, "expected a pair of integers");
        const low:number = range[0];
        const high:number = range[1];
        assert.strictEqual(low, 0, "expected correct low");
        assert.strictEqual(high, 1, "expected correct high");
    });

});

describe('practice', function() {
    /*
     * TODO: your testing strategy for this function should go here.
     * 
     * See the Testing reading for examples of what a testing strategy comment looks
     * like. Make sure you have partitions.
     */
    
    // TODO: when you write your own test, state the partitions that the test covers
    // in between the quotes, like this one
    it('covers no cards', function() {
        assert.deepStrictEqual(practice(1, [new Set()], 0), [], "expected no cards to practice");
    });

});

describe('update', function() {
    /*
     * TODO: your testing strategy for this function should go here.
     * 
     * See the Testing reading for examples of what a testing strategy comment looks
     * like. Make sure you have partitions.
     */

    // TODO: when you write your own test, state the partitions that the test covers
    // in between the quotes, like this one
    it('covers easy card', function() {
        const card:Flashcard = Flashcard.make("pagh", "zero");
        const bucketMap:Map<Flashcard, number> = new Map([[card, 0]]);
        update(card, AnswerDifficulty.EASY, bucketMap, 5);
        assert.deepStrictEqual(bucketMap, new Map([[card, 1]]), "expected card to move");
    });

});

describe('getHint', function() {
    /*
     * TODO: your testing strategy for this function should go here.
     * 
     * Include a testing strategy for the original weak spec,
     * plus a testing strategy for your new stronger spec.
     *
     * See the Testing reading for examples of what a testing strategy comment looks
     * like. Make sure you have partitions.
     */

    // TODO: when you write your own test, state the partitions that the test covers
    // in between the quotes, like this one
    it('covers language-vocabulary card with single-letter back', function() {
        assert.strictEqual(getHint(Flashcard.make("un", "a")), '_');
    });

    /*
     * Note: unlike other functions in this problem set, the tests you write here
     * will *not* be run against any staff implementations of getHint.
     * 
     * You SHOULD strengthen the spec of getHint, and write your tests against
     * your stronger spec.
     */
});

describe('computeProgress', function() {
    /*
     * TODO: your testing strategy for this function should go here.
     */

    // TODO: test cases

    /*
     * Note: unlike other functions in this problem set, the tests you write here
     * will *not* be run against any staff implementations of computeProgress.
     */
});
