import CryptoJs from 'crypto-js'
import mermaid from 'mermaid'

export const verifyMermaid = (content: string) => {
  return new Promise<{ isValid: boolean; }>((resolve) => {
    mermaid.parse(content, {
      suppressErrors: false
    })
      .then(() => {
        resolve({
          isValid: true
        })
      }).catch((err) => {
        resolve({
          isValid: false
        })
      })
  })
}


export const transformMermaid = (content: string): string => {
  return content.replace(/(```mermaid)(?![^]*?```)/g, '```')
}


export const computeHash = (str: string) => {
  return CryptoJs.SHA256(str).toString(CryptoJs.enc.Hex)
}