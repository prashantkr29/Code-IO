const {exec} = require('child_process');
const path = require('path');


const exceute = (filepath,inputpath) =>{
    const file = path.basename(filepath).split(".")[0]; 
    return new Promise((resolve, reject) => {
      // g++ ${filepath} -o ${file}.out && ./${file}.out < ${inputFilePath}
        exec(`g++ ${filepath} -o ${file}.out && ./${file}.out < ${inputpath}`, 
        (error, stdout, stderr) => {
          if (error) {
            reject({ error, stderr });
          } else if(stderr){
            reject(stderr);
          }else{
            resolve(stdout);
          }
        });
      });
};

module.exports = {
    exceute
}