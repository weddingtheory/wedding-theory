'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking connection...');
  const [testData, setTestData] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from('Test')
          .select('*')
          .limit(1);

        if (error) {
          setConnectionStatus('Connection failed: ' + error.message);
          return;
        }

        setTestData(data || []);
        setConnectionStatus(`Connection successful! Found Test table with ${data?.length || 0} records.`);
      } catch (err) {
        setConnectionStatus('Connection error: ' + (err as Error).message);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="text-center p-4 rounded-lg bg-white shadow-sm">
      <p className={`text-sm ${connectionStatus.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
        {connectionStatus}
      </p>
      {testData.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <p>Data from Test table:</p>
          <pre className="mt-2 text-left bg-gray-50 p-2 rounded">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 