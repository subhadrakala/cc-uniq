import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { Readable, Writable } from 'node:stream';
import { generateOutputContent, processData } from '../src/uniq.js';


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


describe('processData', async() => {

    test('processData with -c option', async() => {
        const input = Readable.from(['apple\n', 'apple\n', 'banana\n', 'cherry\n']);
        let captured = '';
        const output = new Writable({
            write(chunk, _encoding, callback) {
                captured += chunk.toString();
                callback();
            }
        });
        await processData(input, ['-c'], output);
        assert.strictEqual(captured, '   2 apple\n   1 banana\n   1 cherry\n');
    });

    test('processData with -d option', async() => {
        const input = Readable.from(['apple\n', 'apple\n', 'banana\n', 'cherry\n']);
        let captured = '';
        const output = new Writable({
            write(chunk, _encoding, callback) {
                captured += chunk.toString();
                callback();
            }
        });
        await processData(input, ['-d'], output);
        assert.strictEqual(captured, 'apple\n');
    });

    test('processData with -u option', async() => {
        const input = Readable.from(['apple\n', 'apple\n', 'banana\n', 'cherry\n']);
        let captured = '';
        const output = new Writable({
            write(chunk, _encoding, callback) {
                captured += chunk.toString();
                callback();
            }
        });
        await processData(input, ['-u'], output);
        assert.strictEqual(captured, 'banana\ncherry\n');
    });

});
