const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname,"Codes")
console.log(dir)

if(!fs.existsSync(dir)){//check if the directory exists or not to create the code file
    fs.mkdirSync(dir,{recursive:true});
}


const generateFile = async (format,code) =>{
    console.log(dir)
    const filename = `test.`+`${format}`
    const filepath = path.join(dir,filename);
    console.log(filepath)
    await fs.writeFileSync(filepath,code);//creating the file in the given filepath
    return filepath;

}
module.exports={
    generateFile,
}