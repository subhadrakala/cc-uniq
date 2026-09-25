import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { generateOutputContent } from '../src/uniq.js'; 

describe('generateOutputContent', () => {
    test('generateOutputContent with -c option', () => {
        const result = generateOutputContent(['-c'], 3, 'apple', true);
        assert.strictEqual(result, '   3 apple\n');
    });

    test('generateOutputContent with -d option', () => {
        const result = generateOutputContent(['-d'], 3, 'apple', true);
        assert.strictEqual(result, 'apple\n');
    });

    test('generateOutputContent with -u option', () => {
        const result = generateOutputContent(['-u'], 1, 'apple', true);
        assert.strictEqual(result, 'apple\n');
    });
});
