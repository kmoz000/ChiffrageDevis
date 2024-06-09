import React, { useState } from "react";
import { FaArrowDown, FaChevronDown, FaEdit } from "react-icons/fa";
import { LuClipboard, LuDelete, LuFileEdit, LuMoreHorizontal } from "react-icons/lu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import EditArticleDialog from "@/components/ui/Dialogs/EditArticle";

type Article = {
  id: number;
  designation: string;
  unit: string;
  prix_achat_transport: number;
  chutes: number;
  consommable: number;
  boulonnerie: number;
  total: number;
};

const data: Article[] = [
  {
    id: 1,
    designation: "Product 1",
    unit: "pcs",
    prix_achat_transport: 100,
    chutes: 5,
    consommable: 20,
    boulonnerie: 10,
    total: 135
  },
  {
    id: 2,
    designation: "Product 2",
    unit: "pcs",
    prix_achat_transport: 120,
    chutes: 3,
    consommable: 25,
    boulonnerie: 15,
    total: 163
  },
  {
    id: 3,
    designation: "Product 3",
    unit: "pcs",
    prix_achat_transport: 80,
    chutes: 2,
    consommable: 15,
    boulonnerie: 8,
    total: 105
  },
  {
    id: 4,
    designation: "Product 4",
    unit: "pcs",
    prix_achat_transport: 150,
    chutes: 7,
    consommable: 30,
    boulonnerie: 20,
    total: 207
  }
];

const columns: ColumnDef<Article>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="kmoz-flex kmoz-items-center kmoz-space-x-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="kmoz-flex kmoz-items-center kmoz-space-x-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => <div className="lowercase">{row.getValue("designation")}</div>
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => <div className="lowercase">{row.getValue("unit")}</div>
  },
  {
    accessorKey: "prix_achat_transport",
    header: "Prix Achat Transport",
    cell: ({ row }) => <div className="lowercase">{row.getValue("prix_achat_transport")}</div>
  },
  {
    accessorKey: "chutes",
    header: "Chutes",
    cell: ({ row }) => <div className="lowercase">{row.getValue("chutes")}</div>
  },
  {
    accessorKey: "consommable",
    header: "Consommable",
    cell: ({ row }) => <div className="lowercase">{row.getValue("consommable")}</div>
  },
  {
    accessorKey: "boulonnerie",
    header: "Boulonnerie",
    cell: ({ row }) => <div className="lowercase">{row.getValue("boulonnerie")}</div>
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <div className="lowercase">{row.getValue("total")}</div>
  },
  {
    id: "actions",
    header: ({ table }) => (
      <div className="kmoz-flex kmoz-items-center kmoz-space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="kmoz-p-0" disabled={(Object.keys(table.getState().rowSelection).length == 0)}>
              <FaEdit size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="kmoz-cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(table.getGroupedSelectedRowModel().rows.map(s => s.original)))
                toast.success("copied")
              }}
            >
              <LuClipboard className="kmoz-h-4 kmoz-w-4" />
              <span className="kmoz-ml-2">Copy</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="kmoz-cursor-pointer"
            >
              <LuDelete className="kmoz-h-4 kmoz-w-4" />
              <span className="kmoz-ml-2">Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      const all = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="kmoz-p-0">
              <FaEdit size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="kmoz-cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(all))
                toast.success("copied")
              }}
            >
              <LuClipboard className="kmoz-h-4 kmoz-w-4" />
              <span className="kmoz-ml-2">Copy</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="kmoz-cursor-pointer"
              asChild
            >
              <EditArticleDialog article={row.original} onSave={(updatedArticle)=>{}} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="kmoz-cursor-pointer"
            >
              <LuDelete className="kmoz-h-4 kmoz-w-4" />
              <span className="kmoz-ml-2">Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [activeselection, setActiveselection] = useState(false)
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (rs) => {
      setActiveselection(Object.values(rowSelection).length > 0)
      setRowSelection(rs)
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="kmoz-w-full">
      <div className="kmoz-flex kmoz-items-center kmoz-py-4">
        <Input
          placeholder="Filter designation..."
          value={(table.getColumn("designation")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("designation")?.setFilterValue(event.target.value)
          }
          className="kmoz-max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="kmoz-ml-auto">
              Columns <FaChevronDown className="kmoz-h-4 kmoz-w-4 kmoz-ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="kmoz-border kmoz-rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}

          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="kmoz-h-24 kmoz-text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="kmoz-flex kmoz-justify-end kmoz-items-center kmoz-space-x-2 kmoz-py-4">
        <div className="kmoz-flex-1 kmoz-text-muted-foreground kmoz-text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="kmoz-space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function Main() {

  return (
    <div className="kmoz-p-4">
      <div className="kmoz-h-fit kmoz-w-full kmoz-flex kmoz-flex-row kmoz-justify-between kmoz-items-center">
        <h2 className="kmoz-mx-2 kmoz-text-balance">Articles</h2>
        <Button className="kmoz-mx-2 kmoz-my-1">
          Ajouter
        </Button>
      </div>
      <div className="kmoz-h-[85vh] kmoz-p-4 kmoz-bg-muted/90 kmoz-shadow-sm kmoz-mt-3 border kmoz-rounded-md">
        <DataTable />
      </div>
    </div>
  )
}

export default Main
