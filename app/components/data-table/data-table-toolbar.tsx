import {
  DataTableViewOptions,
} from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter restaurants..."
          value={(table.getColumn("dba")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("dba")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Input
          placeholder="Filter zipcodes..."
          value={(table.getColumn("zipcode")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("zipcode")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
