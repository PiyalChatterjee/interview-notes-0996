/**
 * Dynamic manifest loader for remote module URLs.
 * Allows runtime configuration of remote locations without code changes.
 */

export type RemoteManifest = {
  remotes: Record<
    string,
    {
      url: string
      timeout?: number
      shared?: string[]
    }
  >
}

const DEFAULT_MANIFEST: RemoteManifest = {
  remotes: {
    remote_products: {
      url: 'http://localhost:5175',
      timeout: 5000,
      shared: ['react', 'react-dom'],
    },
  },
}

class ManifestLoader {
  private manifest: RemoteManifest = DEFAULT_MANIFEST
  private isLoaded = false

  /**
   * Load manifest from URL (production use case: load from config server).
   * Falls back to DEFAULT_MANIFEST if load fails.
   */
  async loadFromUrl(url: string): Promise<RemoteManifest> {
    try {
      const response = await fetch(url, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      this.manifest = await response.json()
      this.isLoaded = true
      console.info('[ManifestLoader] Loaded manifest from', url)
      return this.manifest
    } catch (error) {
      console.warn(
        '[ManifestLoader] Failed to load manifest, using defaults',
        error instanceof Error ? error.message : error
      )
      this.manifest = DEFAULT_MANIFEST
      this.isLoaded = true
      return this.manifest
    }
  }

  /**
   * Use default manifest (development, or when config server unavailable).
   */
  useDefaults(): RemoteManifest {
    this.manifest = DEFAULT_MANIFEST
    this.isLoaded = true
    return this.manifest
  }

  /**
   * Get remote configuration by name.
   */
  getRemote(remoteName: string): RemoteManifest['remotes'][string] | null {
    return this.manifest.remotes[remoteName] || null
  }

  /**
   * Get all remotes.
   */
  getAllRemotes(): RemoteManifest['remotes'] {
    return this.manifest.remotes
  }

  /**
   * Update a single remote URL at runtime (useful for canary deployments).
   */
  updateRemoteUrl(remoteName: string, url: string): void {
    if (this.manifest.remotes[remoteName]) {
      this.manifest.remotes[remoteName].url = url
      console.info(`[ManifestLoader] Updated ${remoteName} URL to ${url}`)
    }
  }
}

export const manifestLoader = new ManifestLoader()
