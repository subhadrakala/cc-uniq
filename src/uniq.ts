import fs from 'node:fs';
import readline from 'node:readline';

export async function processData(inputFile: string, options: string[], outputFile: string) {
    
    if (inputFile && !fs.existsSync(inputFile)) {
        process.exitCode = 2;
        console.error(`uniq: ${inputFile}: No such file or directory`);
        return;
    }

    const input = inputFile ? fs.createReadStream(inputFile) : process.stdin;
    const output = outputFile ? fs.createWriteStream(outputFile) : process.stdout;
    
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
    for await (const line of rl) {
        if (prevLine == line) {
            count++;
        }
        else {
            if (prevLine !== null) {
               writeLineToOutput(output, options, count, prevLine, true);
            }
            prevLine = line;
            count = 1;
        }
    }

    if (prevLine !== null) {
        writeLineToOutput(output, options, count, prevLine, (lastChar == '\n'));
    }
}

function writeLineToOutput(output: fs.WriteStream | NodeJS.WriteStream, options: string[], count: number, line: string, addNewLine: boolean) {
    const ending = addNewLine ? '\n' : '';
    if (options.includes('-c')) {
        output.write(count.toString().padStart(4) + ' ' + line + ending);
    }
    else if(options.includes('-d')) {
        if (count > 1) {
            output.write(line + ending);
        }
    }
    else if (options.includes('-u')) {
        if (count == 1) {
            output.write(line + ending);
        }
    }
    else {
        output.write(line + ending);
    }
}
