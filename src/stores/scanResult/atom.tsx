import { atom } from 'recoil';
import { ScanResult } from '../../types';

export const scanResultState = atom<ScanResult[]>({
  key: 'scanResultState',
  default: [
    {
      id: 1,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 2,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 7,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 14,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 15,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 16,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 17,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 18,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
    {
      id: 19,
      scanType: 'Path traversal',
      scanURL: 'http://localhost/',
      scanPayload: '../../../../../etc/passwd',
    },
  ],
});
