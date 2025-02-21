import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPhoneNumber } from "@/lib/utils";
import type { Restaurant } from "@/types/restaurant-types";
import {
  type Column, type ColumnDef, createColumnHelper,
} from "@tanstack/react-table";
import {
  ArrowUpDown, CheckCircle, MinusCircle, MoreHorizontal, TriangleAlert,
} from "lucide-react";

const columnHelper = createColumnHelper<Restaurant>();

interface SortingButtonProps {
  column: Column<Restaurant, any>;
  label: string;
}

function SortingButton({ column, label }: SortingButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 size-4" />
    </Button>
  );
}

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
    header: ({ column }) => <SortingButton column={column} label="Borough" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("zipcode", {
    header: ({ column }) => <SortingButton column={column} label="Zip" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: (info) => formatPhoneNumber(info.getValue()),
  }),
  columnHelper.accessor("cuisine_description", {
    header: "Cuisine",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.inspections[0]?.inspection_date, {
    id: "inspection_date",
    header: ({ column }) => <SortingButton column={column} label="Date" />,
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString("en-US")
        : "N/A",
  }),
  columnHelper.accessor((row) => row.inspections[0]?.grade, {
    id: "grade",
    header: "Grade",
    cell: (info) => {
      const grade = info.getValue() as
        | keyof typeof gradeDescriptions
        | undefined;
      const gradeDescriptions = {
        N: "Not Yet Graded",
        A: "Grade A",
        B: "Grade B",
        C: "Grade C",
        Z: "Grade Pending",
        P: "Grade Pending issued on re-opening following an initial inspection that resulted in a closure",
      };

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help">{grade || "N/A"}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{grade ? gradeDescriptions[grade] : "Unknown Grade"}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  }),
  columnHelper.accessor((row) => row.inspections[0]?.score, {
    id: "score",
    header: ({ column }) => <SortingButton column={column} label="Score" />,
    cell: (info) => {
      const score = info.getValue();
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help">{score || "N/A"}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lower scores are better:</p>
            <ul>
              <li>0-13 points: Grade A</li>
              <li>14-27 points: Grade B</li>
              <li>28+ points: Grade C</li>
            </ul>
          </TooltipContent>
        </Tooltip>
      );
    },
  }),
  columnHelper.accessor((row) => row.inspections[0]?.critical_flag, {
    id: "critical_flag",
    header: "Critical",
    cell: (info) => {
      const value = info.getValue();
      if (value === "Critical") {
        return <TriangleAlert color="red" aria-label="Critical" />;
      } else if (value === "Not Critical") {
        return <CheckCircle color="green" aria-label="Not Critical" />;
      } else {
        return <MinusCircle color="gray" aria-label="Not Applicable" />;
      }
    },
  }),
  columnHelper.accessor((row) => row.inspections[0]?.action, {
    id: "action",
    header: "Action",
    cell: (info) => {
      const action = info.getValue();
      if (
        !action ||
        action === "Violations were cited in the following area(s)."
      ) {
        return <span className="text-gray-500">N/A</span>;
      }

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help dotted">{action.slice(0, 50)}...</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{action}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  }),
];
