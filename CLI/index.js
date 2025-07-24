// Create a command line interface that lets the user specify a file path 
// and the nodejs process counts the number of words inside it.

const {Command } = require('commander');
const fs = require('fs');
const program = new Command();

program
  .name('countwords')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
    .description('Count the number of words in a file')
    .argument('<file>','file to count')
    .action((file) => {
        fs.readFile(file,'utf-8',(err,data) => {
            if(err){
                console.error(err);
            } else {
                const words = data.split(' ');
                console.log(`There are ${words.length} words in the file`);
                
            }
        })
    })

    program.parse();