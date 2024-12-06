import { exec } from 'child_process'

const COMPILE_CMD = 'kyut-compiler.exe '
const RUN_CMD = 'start cmd.exe /k java -jar mars.jar nc '

export async function handleCompile(filePath: string): Promise<void> {
  const FULL_COMPILE_CMD = COMPILE_CMD + `"${filePath}"`

  return new Promise((resolve, reject) => {
    exec(FULL_COMPILE_CMD, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`)
      } else if (stderr) {
        reject(`Stderr: ${stderr}`)
      } else {
        console.log(stdout)
        resolve()
      }
    })
  })
}

export async function handleRun(filePath: string): Promise<void> {
  const FULL_RUN_CMD = RUN_CMD + `"${filePath.replace(/\..+/, '.asm')}"`
  console.log(filePath)

  return new Promise((resolve, reject) => {
    exec(FULL_RUN_CMD, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`)
      } else if (stderr) {
        reject(`Stderr: ${stderr}`)
      } else {
        console.log(stdout)
        resolve()
      }
    })
  })
}
