import { storage } from '../config';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

export interface UploadProgressCallback {
  (progress: number, downloadUrl?: string, error?: Error): void;
}

/**
 * Compress an image file on client side before uploading to Firebase Storage.
 */
export async function compressImage(file: File, maxWidth = 1600, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(file);

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

/**
 * Upload a vehicle image or gallery photo to Firebase Storage.
 */
export async function uploadVehicleImage(
  file: File,
  vehicleId: string,
  isGallery = false,
  onProgress?: (pct: number) => void
): Promise<{ downloadURL: string; storagePath: string }> {
  const compressedBlob = await compressImage(file);
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop() || 'jpg';
  const folder = isGallery ? 'gallery' : 'cover';
  const storagePath = `vehicles/${vehicleId}/${folder}_${timestamp}.${fileExt}`;

  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, compressedBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error('[uploadVehicleImage Error]:', error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ downloadURL, storagePath });
      }
    );
  });
}

/**
 * Upload a customer profile avatar photo to Firebase Storage.
 */
export async function uploadProfilePhoto(
  file: File,
  uid: string,
  onProgress?: (pct: number) => void
): Promise<{ downloadURL: string; storagePath: string }> {
  const compressedBlob = await compressImage(file, 800, 0.85);
  const fileExt = file.name.split('.').pop() || 'jpg';
  const storagePath = `profiles/${uid}/avatar_${Date.now()}.${fileExt}`;

  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, compressedBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error('[uploadProfilePhoto Error]:', error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ downloadURL, storagePath });
      }
    );
  });
}

/**
 * Utility to parse YouTube video IDs from URLs (e.g., https://www.youtube.com/watch?v=XYZ or https://youtu.be/XYZ)
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
