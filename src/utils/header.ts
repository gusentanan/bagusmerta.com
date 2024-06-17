import { format } from 'date-fns';
import fetch from 'node-fetch';

export function getCurrentTimestamp(): string {
  const now = new Date();
  return format(now, 'HH:mm');
}

export async function getLatestCommitHash(): Promise<string> {
  const url = `https://api.github.com/repos/gusentanan/bagusmerta.com/commits`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: unknown = await response.json();

    if (Array.isArray(data) && data.length > 0 && typeof data[0].sha === 'string') {
      const latestCommit = data[0];
      return latestCommit.sha.substring(0, 7);
    } else {
      throw new Error('Unexpected data format');
    }
  } catch (error) {
    console.error('Error fetching commit hash:', error);
    return 'unknown';
  }
}
