import { BranchDataType, columns } from './columns';
import { DataTable } from './data-table';
import DefaultLayout from '@/layout/DefaultLayout';
import { ItemData } from './BranchData';

function getData(): BranchDataType[] {
  // Fetch data from API.
  const data = ItemData;
  return data;
}

export default function BranchManagement() {
  const data = getData();

  return (
    <DefaultLayout>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </DefaultLayout>
  );
}
