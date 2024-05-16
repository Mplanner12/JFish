import { UsersDataType, columns } from './columns';
import { DataTable } from './data-table';
import DefaultLayout from '@/layout/DefaultLayout';
import { UsersData } from './usersData';

function getData(): UsersDataType[] {
  // Fetch data from API.
  const data = UsersData;
  return data;
}

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJuYW1lIjoiTXVzdGFwaGEgQWRtaW4iLCJzdWIiOiJtdXN0YXBoYUBqdGZpc2gubmciLCJpYXQiOjE3MTU1Mzk0NDcsImlzcyI6IkpURklTSCBMVEQifQ.T6ys1weAOZYtk09mbC0irLgp139C7pDXU7M2dvNbbYY';

const fetchData = async () => {
  try {
    const response = await fetch('http://185.4.176.195:8989/users', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5174/',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',

        // Authorization: 'Basic ' + btoa('mustapha@jtfish.ng:password'),
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch data
fetchData();

export default function UserManagement() {
  const data = getData();

  return (
    <DefaultLayout>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </DefaultLayout>
  );
}
