import fs from 'node:fs';
import { processData } from "./uniq.js";

async function main() {

    const args = process.argv.slice(2);

    const flags = args.filter(arg => arg.startsWith('-'));
    const contents = args.filter(arg => !arg.startsWith('-'));


        let content = contents[0];
        let outputFile = contents[1] || '';
    
        if (content === undefined) {
            await processData(process.stdin, flags, process.stdout);
        }
        else {
              if (content && !fs.existsSync(content)) {
                    process.exitCode = 2;
                    console.error(`uniq: ${content}: No such file or directory`);
                    return;
                }
                const inputStream = fs.createReadStream(content);
                const outputStream = outputFile ? fs.createWriteStream(outputFile) : process.stdout;

            await processData(inputStream, flags, outputStream);
        }
       
}


main();
