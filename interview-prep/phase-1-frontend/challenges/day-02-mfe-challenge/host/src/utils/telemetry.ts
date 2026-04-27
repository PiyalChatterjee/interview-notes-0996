/**
 * Telemetry event tracking for microfrontend runtime behavior.
 * Tracks remote load success/failure, retry attempts, and fatal failures.
 */

import { logger } from './logger'

export type TelemetryEvent = {
  eventName: string
  timestamp: string
  correlationId: string
  remoteName: string
  duration?: number
  retryCount?: number
  errorMessage?: string
  isFatal?: boolean
}

class Telemetry {
  private events: TelemetryEvent[] = []

  recordRemoteLoadStart(remoteName: string): string {
    const startTime = Date.now()
    const correlationId = logger.getCorrelationId()

    logger.info(`Remote load started: ${remoteName}`, {
      component: 'RemoteLoader',
      remoteName,
    })

    return `${remoteName}-${startTime}`
  }

  recordRemoteLoadSuccess(remoteName: string, startTime: number): void {
    const duration = Date.now() - startTime
    const event: TelemetryEvent = {
      eventName: 'remote_load_success',
      timestamp: new Date().toISOString(),
      correlationId: logger.getCorrelationId(),
      remoteName,
      duration,
    }

    this.events.push(event)
    logger.info(`Remote load succeeded: ${remoteName}`, {
      component: 'RemoteLoader',
      remoteName,
      duration: `${duration}ms`,
    })
  }

  recordRemoteLoadFailure(
    remoteName: string,
    error: Error,
    retryCount: number,
    isFatal: boolean
  ): void {
    const event: TelemetryEvent = {
      eventName: 'remote_load_failure',
      timestamp: new Date().toISOString(),
      correlationId: logger.getCorrelationId(),
      remoteName,
      retryCount,
      errorMessage: error.message,
      isFatal,
    }

    this.events.push(event)
    logger.error(`Remote load failed: ${remoteName}`, error, {
      component: 'RemoteLoader',
      remoteName,
      retryCount,
      isFatal,
    })
  }

  recordTimeout(remoteName: string, timeoutMs: number): void {
    const event: TelemetryEvent = {
      eventName: 'remote_load_timeout',
      timestamp: new Date().toISOString(),
      correlationId: logger.getCorrelationId(),
      remoteName,
      duration: timeoutMs,
    }

    this.events.push(event)
    logger.warn(`Remote load timeout: ${remoteName}`, {
      component: 'RemoteLoader',
      remoteName,
      timeoutMs,
    })
  }

  recordFatalError(remoteName: string, error: Error, retryCount: number): void {
    const event: TelemetryEvent = {
      eventName: 'remote_fatal_error',
      timestamp: new Date().toISOString(),
      correlationId: logger.getCorrelationId(),
      remoteName,
      retryCount,
      errorMessage: error.message,
      isFatal: true,
    }

    this.events.push(event)
    logger.error(`Remote fatal error (max retries exhausted): ${remoteName}`, error, {
      component: 'RemoteLoader',
      remoteName,
      retryCount,
      isFatal: true,
    })
  }

  getEvents(): TelemetryEvent[] {
    return [...this.events]
  }

  clearEvents(): void {
    this.events = []
  }
}

export const telemetry = new Telemetry()
