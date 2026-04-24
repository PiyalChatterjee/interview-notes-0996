import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const remoteEntryPath = join(process.cwd(), 'dist', 'assets', 'remoteEntry.js')

if (!existsSync(remoteEntryPath)) {
	console.warn(`[fix-remote-entry] File not found: ${remoteEntryPath}`)
	process.exit(0)
}

const source = readFileSync(remoteEntryPath, 'utf8')

// Work around a Windows-path css placeholder issue where the generated code calls
// dynamicLoadingCss with a string instead of an array, causing `e.forEach is not a function`.
const patched = source.replace(
	/a\(`__v__css__([^`]+)`\s*,\s*!(0|1)\s*,/g,
	'a([`__v__css__$1`],!$2,'
)

if (patched !== source) {
	writeFileSync(remoteEntryPath, patched, 'utf8')
	console.log('[fix-remote-entry] Patched css placeholder argument in remoteEntry.js')
} else {
	console.log('[fix-remote-entry] No patch needed')
}
