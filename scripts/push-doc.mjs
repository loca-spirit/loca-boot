// 将dist目录下的内容通过ftp上传到服务器
import ftp from 'basic-ftp'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import process from 'process'
// 加载环境变量
dotenv.config()

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_PORT = '21', REMOTE_DIR = '/' } = process.env

async function uploadDirectory(client, localDir, remoteDir) {
  // 确保远程目录存在
  await client.ensureDir(remoteDir)

  // 读取本地目录内容
  const files = fs.readdirSync(localDir)

  for (const file of files) {
    const localPath = path.join(localDir, file)
    const remotePath = path.join(remoteDir, file).replace(/\\/g, '/')

    if (fs.statSync(localPath).isDirectory()) {
      // 如果是目录，递归上传
      await uploadDirectory(client, localPath, remotePath)
    } else {
      // 如果是文件，直接上传
      await client.uploadFrom(localPath, remotePath)
      console.log(`已上传: ${localPath} -> ${remotePath}`)
    }
  }
}

async function main() {
  const client = new ftp.Client()
  client.ftp.verbose = true

  try {
    // 移除FTP_HOST中的ftp://前缀
    const host = FTP_HOST.replace('ftp://', '').split(':')[0]
    const params = {
      host,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: parseInt(FTP_PORT),
      secure: false,
    }
    await client.access(params)

    console.log('FTP连接成功')

    // 上传dist目录
    const distPath = path.join(process.cwd(), 'dist')
    await uploadDirectory(client, distPath, REMOTE_DIR)

    console.log('所有文件上传完成')
  } catch (err) {
    console.error('上传过程中发生错误:', err)
  } finally {
    client.close()
  }
}

main()
