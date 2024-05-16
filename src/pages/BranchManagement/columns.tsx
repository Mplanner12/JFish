'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

// import { ArrowUpDown } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BranchDataType = {
  BranchName: string;
  ID: string;
  Address: string;
};

export const columns: ColumnDef<BranchDataType>[] = [
  {
    accessorKey: 'BranchName',
    header: 'Branch Name',
  },
  {
    accessorKey: 'ID',
    header: 'ID',
  },
  {
    accessorKey: 'Address',
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       Amount
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    header: 'Address',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const BranchInfo = row.original;

      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-basecolor">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(BranchInfo.Address)}
            >
              <div className="flex justify-between">
                <img src="editicon.png" alt="" />
                <button
                  onClick={() => navigate('/BranchManagement/updatebranch')}
                >
                  <p className="px-2">Update Branch</p>
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            <DropdownMenuItem>
              {' '}
              <div className="flex justify-between">
                <img src="deleteicon.png" alt="" />
                <button>
                  <p className="px-2">Delete Branch</p>
                </button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
