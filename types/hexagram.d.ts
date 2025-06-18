export type HexagramObject = {
  number: number
  name: string
  binary: string
  unicode: string
  info: string
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
