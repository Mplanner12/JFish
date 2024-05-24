import { UsersDataType, columns } from './columns';
import { DataTable } from './data-table';
import DefaultLayout from '@/layout/DefaultLayout';
import { useAuth } from '../utils/AuthContext';
import { useState, useEffect } from 'react';

export default function UserManagement() {
  const [userData, setUserData] = useState<UsersDataType[]>([]);
  const { fetchWithAuth } = useAuth();

  const fetchData = async () => {
    const response = await fetchWithAuth(
      'http://185.4.176.195:8989/api/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const rawdata = await response.json();
    const data = rawdata.data;
    setUserData(data);
    // console.log(userData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={userData} />
      </div>
    </DefaultLayout>
  );
}
