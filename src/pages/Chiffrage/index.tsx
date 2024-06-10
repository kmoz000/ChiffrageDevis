import { useEffect, useState } from "react";
import { FaChevronDown, FaEdit } from "react-icons/fa";
import { LuClipboard, LuDelete } from "react-icons/lu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import EditProjectIndexDialog from "@/components/ui/Dialogs/EditProjectIndexDialog";
import AddProjectIndexDialog from "@/components/ui/Dialogs/AddProjectIndex";
import { databaseService } from "@/lib/store";

type ProjectIndex = {
  id: number;
  designation: string;
  unite: string;
  qte: number;
  matiere: number;
  mo: number;
  ce: number;
  cout: number;
  frais_machine: number;
  peinture: number;
  transport: number;
  manutention_mo_mont: number;
  ce_mont: number;
  cout_mont: number;
  frais_dep_chant: number;
  prix_de_revient: number;
  pr_un: number;
  marge: number;
  pv_un: number;
  pv_un_prix_vente_dh_ht: number;
};



const columns: ColumnDef<ProjectIndex>[] = [
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
    accessorKey: "unite",
    header: "Unite",
    cell: ({ row }) => <div className="lowercase">{row.getValue("unite")}</div>
  },
  {
    accessorKey: "qte",
    header: "Qte",
    cell: ({ row }) => <div className="lowercase">{row.getValue("qte")}</div>
  },
  {
    accessorKey: "matiere",
    header: "Matiere",
    cell: ({ row }) => <div className="lowercase">{row.getValue("matiere")}</div>
  },
  {
    accessorKey: "mo",
    header: "MO",
    cell: ({ row }) => <div className="lowercase">{row.getValue("mo")}</div>
  },
  {
    accessorKey: "ce",
    header: "CE",
    cell: ({ row }) => <div className="lowercase">{row.getValue("ce")}</div>
  },
  {
    accessorKey: "cout",
    header: "Cout",
    cell: ({ row }) => <div className="lowercase">{row.getValue("cout")}</div>
  },
  {
    accessorKey: "frais_machine",
    header: "Frais Machine",
    cell: ({ row }) => <div className="lowercase">{row.getValue("frais_machine")}</div>
  },
  {
    accessorKey: "peinture",
    header: "Peinture",
    cell: ({ row }) => <div className="lowercase">{row.getValue("peinture")}</div>
  },
  {
    accessorKey: "transport",
    header: "Transport",
    cell: ({ row }) => <div className="lowercase">{row.getValue("transport")}</div>
  },
  {
    accessorKey: "manutention_mo_mont",
    header: "Manutention MO Mont",
    cell: ({ row }) => <div className="lowercase">{row.getValue("manutention_mo_mont")}</div>
  },
  {
    accessorKey: "ce_mont",
    header: "CE Mont",
    cell: ({ row }) => <div className="lowercase">{row.getValue("ce_mont")}</div>
  },
  {
    accessorKey: "cout_mont",
    header: "Cout Mont",
    cell: ({ row }) => <div className="lowercase">{row.getValue("cout_mont")}</div>
  },
  {
    accessorKey: "frais_dep_chant",
    header: "Frais Dep Chant",
    cell: ({ row }) => <div className="lowercase">{row.getValue("frais_dep_chant")}</div>
  },
  {
    accessorKey: "prix_de_revient",
    header: "Prix de Revient",
    cell: ({ row }) => <div className="lowercase">{row.getValue("prix_de_revient")}</div>
  },
  {
    accessorKey: "pr_un",
    header: "PR Un",
    cell: ({ row }) => <div className="lowercase">{row.getValue("pr_un")}</div>
  },
  {
    accessorKey: "marge",
    header: "Marge",
    cell: ({ row }) => <div className="lowercase">{row.getValue("marge")}%</div>
  },
  {
    accessorKey: "pv_un",
    header: "PV Un",
    cell: ({ row }) => <div className="lowercase">{row.getValue("pv_un")}</div>
  },
  {
    accessorKey: "pv_un_prix_vente_dh_ht",
    header: "PV Un Prix Vente DH HT",
    cell: ({ row }) => <div className="lowercase">{row.getValue("pv_un_prix_vente_dh_ht")}</div>
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
              onClick={() => {
                Promise.all(table.getSelectedRowModel().rows.map((row) => {
                  let art = row.original;
                  return databaseService.removeProjectIndex(art.id)
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
              <EditProjectIndexDialog projectIndex={row.original} onSave={(_updatedProjectIndex) => null} />
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
  const [_activeselection, setActiveselection] = useState(false)
  const [data, setData] = useState<ProjectIndex[]>([])
  useEffect(() => {
    (async () => {
      try {
        let _data = await databaseService.fetchAllProjectIndexes()
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
        <h2 className="kmoz-mx-2 kmoz-text-balance">Project Indices</h2>
        <AddProjectIndexDialog onSave={(newProjectIndex) => {
          databaseService.addProjectIndex(
            newProjectIndex.designation,
            newProjectIndex.unite,
            newProjectIndex.qte,
            newProjectIndex.matiere,
            newProjectIndex.mo,
            newProjectIndex.ce,
            newProjectIndex.cout,
            newProjectIndex.frais_machine,
            newProjectIndex.peinture,
            newProjectIndex.transport,
            newProjectIndex.manutention_mo_mont,
            newProjectIndex.ce_mont,
            newProjectIndex.cout_mont,
            newProjectIndex.frais_dep_chant,
            newProjectIndex.prix_de_revient,
            newProjectIndex.pr_un,
            newProjectIndex.marge,
            newProjectIndex.pv_un,
            newProjectIndex.pv_un_prix_vente_dh_ht
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
