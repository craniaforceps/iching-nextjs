import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'hexagrams.json')

export async function POST(request: Request) {
  try {
    const newReading = await request.json()

    let readings = []
    if (fs.existsSync(DATA_PATH)) {
      const fileContents = fs.readFileSync(DATA_PATH, 'utf-8')
      readings = JSON.parse(fileContents)
    }

    readings.push(newReading)

    fs.writeFileSync(DATA_PATH, JSON.stringify(readings, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    })
  }
}
