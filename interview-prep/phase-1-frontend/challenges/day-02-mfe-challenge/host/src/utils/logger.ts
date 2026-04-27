/**
 * Structured logger with correlation ID tracking for production debugging.
 * All errors logged here include context for ops teams to trace remote failures.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export type LogContext = {
  correlationId: string
  component: string
  timestamp: string
  [key: string]: any
}

class Logger {
  private correlationId: string

  constructor(initialCorrelationId?: string) {
    this.correlationId = initialCorrelationId || this.generateCorrelationId()
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  setCorrelationId(id: string): void {
    this.correlationId = id
  }

  getCorrelationId(): string {
    return this.correlationId
  }

  private log(level: LogLevel, message: string, context: Record<string, any> = {}): void {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      correlationId: this.correlationId,
      ...context,
    }

    // In production, this would send to a centralized logging service (e.g., DataDog, Splunk)
    console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
      `[${level.toUpperCase()}] ${message}`,
      logEntry
    )
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context)
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log('error', message, {
      ...context,
      errorMessage: error?.message,
      errorStack: error?.stack,
    })
  }
}

export const logger = new Logger()
