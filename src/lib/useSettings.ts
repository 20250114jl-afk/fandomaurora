import { useState, useEffect } from 'react';
import { getSettings } from './settings';

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getSettings()
      .then(data => {
        if (mounted) {
          setSettings(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("useSettings error:", err);
        if (mounted) {
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  return { settings, loading };
}
