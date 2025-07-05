// export type HexagramObject = {
//   number: number
//   name: string
//   binary: string
//   unicode: string
//   info: string
//   details?: {
//     judgment: string[]
//     image: string[]
//     lines: [{ position: number; text: string[] }]
//   }
// }

export type HexagramLine = {
  position: number
  text: string[]
}

export type HexagramDetails = {
  judgment: string[]
  image: string[]
  lines: HexagramLine[]
}

export type HexagramObject = {
  number: number
  name: string
  binary: string
  unicode: string
  info: string
  details?: HexagramDetails
}

export type BinaryResult = {
  binary1: string
  binary2: string
}

export type BinaryMatchInput = {
  binary1: string
  binary2: string
}

export type BinaryMatchOutput = {
  match1: HexagramObject
  match2: HexagramObject
}
