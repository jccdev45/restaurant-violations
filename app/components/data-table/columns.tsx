import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Restaurant } from "@/types/restaurant-types";
import { Link } from "@tanstack/react-router";
import {
  type Column,
  type ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  ChevronsUpDown,
  EyeOff,
  MinusCircle,
  MoreHorizontal,
  TriangleAlert,
} from "lucide-react";

const columnHelper = createColumnHelper<Restaurant>();

interface SortingButtonProps {
  column: Column<Restaurant, any>;
  label: string;
  className?: string;
}

function SortingButton({ column, label, className }: SortingButtonProps) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{label}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{label}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const columns: ColumnDef<Restaurant, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  columnHelper.accessor("dba", {
    header: "Name",
    cell: (info) => {
      const name = info.getValue();

      return name.length > 20 ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help dotted whitespace-nowrap">
              {`${name.slice(0, 20)}...`}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        name
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor((row) => `${row.building} ${row.street}`, {
    id: "address",
    header: "Address",
    cell: (info) => {
      const address = info.getValue();

      return address.length > 20 ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help dotted whitespace-nowrap">
              {`${address.slice(0, 20)}...`}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{address}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        address
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("boro", {
    header: "Borough",
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("zipcode", {
    header: "Zip",
    cell: (info) => info.getValue(),
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
        ? new Date(info.getValue() as string).toLocaleDateString("en-US", {
            year: "2-digit",
            day: "numeric",
            month: "numeric",
          })
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
  columnHelper.accessor(
    (row) => row.inspections[0]?.violations[0]?.violation_description,
    {
      id: "violation_description",
      header: "Description",
      cell: (info) => {
        const desc = info.getValue();
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help dotted whitespace-nowrap">
                {desc.slice(0, 50)}...
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{desc}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    }
  ),
  // columnHelper.accessor((row) => row.inspections[0]?.action, {
  //   id: "action",
  //   header: "Action",
  //   cell: (info) => {
  //     const action = info.getValue();
  //     if (
  //       !action ||
  //       action === "Violations were cited in the following area(s)."
  //     ) {
  //       return <span className="text-gray-500">N/A</span>;
  //     }

  //     return (
  //       <Tooltip>
  //         <TooltipTrigger asChild>
  //           <span className="cursor-help dotted">{action.slice(0, 50)}...</span>
  //         </TooltipTrigger>
  //         <TooltipContent>
  //           <p>{action}</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     );
  //   },
  // }),
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
          <DropdownMenuItem
            onClick={() => console.log(props.row.original)}
            asChild
          >
            <Link
              to="/restaurants/$camis/inspections/$inspectionDate"
              params={{
                camis: props.row.original.camis,
                inspectionDate:
                  props.row.original.inspections[0]?.inspection_date,
              }}
            >
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => console.log(props.row.original)}
            asChild
          >
            <Link
              to="/restaurants/$camis"
              params={{ camis: props.row.original.camis }}
            >
              View Inspection History
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];
