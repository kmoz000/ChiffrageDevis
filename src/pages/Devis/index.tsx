import React, { useEffect, useState } from "react";
import { FaArrowDown, FaChevronDown, FaEdit, FaFilePdf } from "react-icons/fa";
import { LuClipboard, LuDelete, LuFileEdit, LuSpace } from "react-icons/lu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import EditDevisDialog from "@/components/ui/Dialogs/EditDevisDialog";
import { ProjectIndex, databaseService } from "@/lib/store";
import AddDevisDialog from "@/components/ui/Dialogs/AddDevis";
import ExportDevisDialog from "@/components/ui/Dialogs/Export";

type Devis = {
  id: number;
  project_index_id: number;
  quantity: number;
  total_ht: number;
};


const columns: ColumnDef<Devis>[] = [
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
    accessorKey: "project_index_id",
    header: "Project Index ID",
    cell: ({ row }) => <div className="lowercase">{row.getValue("project_index_id")}</div>
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="lowercase">{row.getValue("quantity")}</div>
  },
  {
    accessorKey: "total_ht",
    header: "Total HT",
    cell: ({ row }) => <div className="lowercase">{row.getValue("total_ht")}</div>
  },
  {
    id: "actions",
    header: ({ table }) => (
      <div className="kmoz-flex kmoz-items-center kmoz-space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="kmoz-p-0 kmoz-w-full" disabled={(Object.keys(table.getState().rowSelection).length == 0)}>
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
              asChild
            >
              <ExportDevisDialog selectedDevis={table.getSelectedRowModel().rows.map(s => s.original)} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="kmoz-cursor-pointer"
              onClick={() => {
                Promise.all(table.getSelectedRowModel().rows.map((row) => {
                  let art = row.original;
                  return databaseService.removeDevis(art.id)
                })).then(() => {
                  toast.success("removed")
                })
              }}
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
            <Button variant="ghost" className="kmoz-p-0 kmoz-w-full">
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
              <EditDevisDialog devis={row.original} onSave={(updatedDevis) => null} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="kmoz-cursor-pointer"
              onClick={() => {
                let art = row.original;
                databaseService.removeProjectIndex(art.id).then(() => {
                  toast.success("cleared")
                })
              }}
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
  const [data, setData] = useState<Devis[]>([])
  useEffect(() => {
    (async () => {
      try {
        let _data = await databaseService.fetchAllDevis()
        setData(_data)
      } catch (error) {

      }
    })()
  })
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
          placeholder="Filter project index id..."
          value={(table.getColumn("project_index_id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("project_index_id")?.setFilterValue(event.target.value)
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
        <h2 className="kmoz-mx-2 kmoz-text-balance">Devis</h2>
        <AddDevisDialog onSave={(newDevis) => {
          databaseService.addDevis(
            newDevis.project_index_id,
            newDevis.quantity,
            newDevis.total_ht
          ).then(() => {
            toast.success("saved")
          })
            .catch(() => {
              toast.error("not saved!")
            })
        }} />
      </div>
      <div className="kmoz-h-[100%] kmoz-p-4 kmoz-bg-muted/90 kmoz-shadow-sm kmoz-mt-3 border kmoz-rounded-md">
        <DataTable />
      </div>
    </div>
  )
}

export default Main;