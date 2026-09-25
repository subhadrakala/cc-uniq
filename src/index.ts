
import { processData } from "./uniq.js";

async function main() {

    const args = process.argv.slice(2);

    const flags = args.filter(arg => arg.startsWith('-'));
    const contents = args.filter(arg => !arg.startsWith('-'));


        let content = contents[0];
        let outputFile = contents[1] || '';
    
        if (content === undefined) {
            await processData('', flags, '');
        }
        else {
            await processData(content, flags, outputFile);
        }
       
}


main();
