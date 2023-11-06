export type ScanTypes = 'XSS Injection' | 'Path Traversal' | 'OS Command Injection' | 'SQL Injection';

export type XSSType = 'reflection' | 'stored';

export type XSSOption = 'fast' | 'accurate';

export interface ScanResult {
  id: number;
  inputURL?: string;
  scanType: string;
  scanURL: string;
  scanPayload: string;
}
