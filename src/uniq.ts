import fs from 'node:fs';
import readline from 'node:readline';

export async function processData(input: NodeJS.ReadableStream, options: string[], output: NodeJS.WritableStream) {

    let rl = readline.createInterface({
        input: input,
        crlfDelay: Infinity
    });

    let lastChar = '';
    input.on('data', (chunk: Buffer) => {
        const last = chunk[chunk.length - 1];
        if (last !== undefined) {
            lastChar = last.toString();
        }
    });
    
    let prevLine: string | null = null;
    let count = 1;
    let outputContent = '';
    for await (const line of rl) {
        if (prevLine == line) {
            count++;
        }
        else {
            if (prevLine !== null) {
               outputContent = generateOutputContent(options, count, prevLine, true);
               output.write(outputContent);
            }
            prevLine = line;
            count = 1;
        }
    }

    if (prevLine !== null) {
        outputContent = generateOutputContent(options, count, prevLine, (lastChar == '\n'));
        output.write(outputContent);
    }
}

export function generateOutputContent(options: string[], count: number, line: string, addNewLine: boolean) {
    const ending = addNewLine ? '\n' : '';
    let output = '';
    if (options.includes('-c')) {
        output = count.toString().padStart(4) + ' ' + line + ending;
    }
    else if(options.includes('-d')) {
        if (count > 1) {
            output = line + ending;
        }
    }
    else if (options.includes('-u')) {
        if (count == 1) {
            output = line + ending;
        }
    }
    else {
        output = line + ending;
    }
    return output;
}
