type Meta = Record<string, unknown>

function format(level: string, message: string, meta?: Meta) {
  const stamp = new Date().toISOString()
  const suffix = meta ? ` ${JSON.stringify(meta)}` : ''
  return `[${stamp}] ${level} ${message}${suffix}`
}

/** Мінімальний логер. Замінюється на pino/winston без зміни викликів. */
export const logger = {
  info: (message: string, meta?: Meta) => console.log(format('INFO', message, meta)),
  warn: (message: string, meta?: Meta) => console.warn(format('WARN', message, meta)),
  error: (message: string, meta?: Meta) =>
    console.error(format('ERROR', message, meta)),
}
