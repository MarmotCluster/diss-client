export type ScanTypes = 'Reflected XSS' | 'Path Traversal' | 'OS Command Injection';

export type XSSOption = 'fast' | 'accurate';

export interface ScanResult {
  id: number;
  scanType: string;
  scanURL: string;
  scanPayload: string;
}
