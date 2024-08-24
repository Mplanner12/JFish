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

import { ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useState } from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersDataType = {
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  branch: string;
  role: string;
  id: string;
  phone: number;
  email: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  password: string;
  defaultPassword: boolean;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  authorities: string;
};

export const columns: ColumnDef<UsersDataType>[] = [
  {
    accessorKey: 'firstname',
    header: 'FirstName',
  },
  {
    accessorKey: 'middlename',
    header: 'MiddleName',
  },
  {
    accessorKey: 'lastname',
    header: 'LastName',
  },
  {
    accessorKey: 'username',
    header: 'UserName',
  },
  {
    accessorKey: 'branch',
    header: 'Branch',
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const userData = row.original;
      const userid = userData.id;
      const [id, setId] = useState(userid);

      const navigate = useNavigate();
      const { deleteUser } = useAuth();

      function handleDeleteUser() {
        setId(userid);
        deleteUser({ id: id });
        console.log(id);
      }
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
              onClick={() => navigator.clipboard.writeText(userData.id)}
            >
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/UserManagement/updateuser/${id}`)}
                >
                  <img src="editicon.png" alt="" />
                  <p>Update Info</p>
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            <DropdownMenuItem>
              {' '}
              <button onClick={handleDeleteUser}>
                <div className="flex justify-between">
                  <img src="deleteicon.png" alt="" />
                  <p>Delete User</p>
                </div>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
