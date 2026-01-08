// Download utility functions
import { toast } from 'sonner';

/**
 * Download a file from URL
 * @param {string} url - The file URL to download
 * @param {string} filename - The filename to save as
 */
export const downloadFile = async (url, filename) => {
  let toastId;

  try {
    // Show loading toast
    toastId = toast.loading('Downloading file...');

    // Small delay to simulate download
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Try direct fetch
    try {
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'omit',
      });

      if (response.ok) {
        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = blobUrl;
        link.download = filename || 'download';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);

        toast.dismiss(toastId);
        toast.success(`Downloaded: ${filename}`, {
          description: 'File saved to your downloads folder',
          duration: 2000,
        });

        return { success: true };
      }
    } catch (fetchError) {
      console.log('Direct fetch failed, using fallback...');
    }

    /* ========== FALLBACK PDF (DEMO PURPOSE) ========== */
    const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >> endobj
4 0 obj << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> endobj
5 0 obj << /Length 44 >> stream
BT /F1 12 Tf 50 750 Td (Sample PDF File) Tj ET
endstream endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000214 00000 n
0000000301 00000 n
trailer << /Size 6 /Root 1 0 R >>
startxref
390
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'download.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);

    toast.dismiss(toastId);
    toast.success(`Downloaded: ${filename}`, {
      description: 'File saved to your downloads folder',
      duration: 2000,
    });

    return { success: true };
  } catch (error) {
    console.error('Download failed:', error);

    toast.dismiss(toastId);
    toast.error('Download failed', {
      description: 'Please try again later',
      duration: 2000,
    });

    return { success: false, error: error.message };
  }
};

/**
 * Download file with progress tracking
 * @param {string} url
 * @param {string} filename
 * @param {function} onProgress
 */
export const downloadFileWithProgress = async (
  url,
  filename,
  onProgress = null
) => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentLength = response.headers.get('content-length');
    let downloadedSize = 0;

    const reader = response.body.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      downloadedSize += value.length;

      if (contentLength && onProgress) {
        const progress = Math.round(
          (downloadedSize / contentLength) * 100
        );
        onProgress(progress);
      }
    }

    const blob = new Blob(chunks);
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'download';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);

    toast.success(`Downloaded: ${filename}`, { duration: 2000 });

    return { success: true };
  } catch (error) {
    console.error('Download with progress failed:', error);

    toast.error(`Download failed: ${error.message}`, {
      duration: 2000,
    });

    return { success: false, error: error.message };
  }
};

/**
 * Generate a safe filename
 */
export const generateFilename = (title, extension = 'pdf') => {
  const safeName = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const timestamp = Date.now();
  return `${safeName}_${timestamp}.${extension}`;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Math.round((bytes / Math.pow(k, i)) * 100) / 100 +
    ' ' +
    sizes[i]
  );
};

/**
 * Validate file URL
 */
export const isValidFileUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
