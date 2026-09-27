export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString();
}

export function severityColor(severity: 'INFO' | 'WARN' | 'CRITICAL'): string {
  switch (severity) {
    case 'INFO': return '#10b981';
    case 'WARN': return '#f59e0b';
    case 'CRITICAL': return '#ef4444';
    default: return '#94a3b8';
  }
}

export function statusBadge(status: string): string {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
    case 'VERIFIED':
      return '#10b981';
    case 'FAILED':
      return '#ef4444';
    case 'PENDING':
    case 'REQUESTED':
      return '#f59e0b';
    default:
      return '#3b82f6';
  }
}
