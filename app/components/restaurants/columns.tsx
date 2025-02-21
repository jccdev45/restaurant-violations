import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Restaurant } from "@/types/restaurant-types";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

const columnHelper = createColumnHelper<Restaurant>();

export const columns: ColumnDef<Restaurant, any>[] = [
  columnHelper.display({
    id: "actions",
    cell: (props) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => console.log(props.row.original)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Inspection History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
  columnHelper.accessor("dba", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => `${row.building} ${row.street}`, {
    id: "address",
    header: "Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("boro", {
    header: "Borough",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("zipcode", {
    header: "Zip",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("cuisine_description", {
    header: "Cuisine",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.inspections[0]?.inspection_date, {
    id: "inspection_date",
    header: "Inspection Date",
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString("en-US")
        : "N/A",
  }),
  columnHelper.accessor((row) => row.inspections[0]?.grade, {
    id: "grade",
    header: "Grade",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.accessor((row) => row.inspections[0]?.score, {
    id: "score",
    header: "Score",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.accessor((row) => row.inspections[0]?.critical_flag, {
    id: "critical_flag",
    header: "Critical",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.accessor(
    (row) => {
      const action = row.inspections[0]?.action;
      return action &&
        action !== "Violations were cited in the following area(s)."
        ? action
        : "N/A";
    },
    {
      id: "action",
      header: "Action",
      cell: (info) => info.getValue(),
    }
  ),
];
