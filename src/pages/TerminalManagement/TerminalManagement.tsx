import { TerminalDataType, columns } from './columns';
import { DataTable } from './data-table';
import DefaultLayout from '@/layout/DefaultLayout';
import { ItemData } from './TerminalData';

function getData(): TerminalDataType[] {
  // Fetch data from API.
  const data = ItemData;
  return data;
}

export default function TerminalManagement() {
  const data = getData();

  return (
    <DefaultLayout>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </DefaultLayout>
  );
}
