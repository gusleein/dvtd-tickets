// для seconds*1000
export function tsToStringDate(ts: number) {
  return (new Date(ts * 1000)).toISOString().slice(0, 10)
}

export function parseTsFromInt(date: number) {
  return Math.trunc(((new Date(date)).getTime() / 1000))
}

export function parseTsFromString(date: string) {
  return Math.trunc(((new Date(date)).getTime() / 1000))
}