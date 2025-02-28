import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Restaurant } from "@/types/restaurant-types";
import { Link } from "@tanstack/react-router";
import {
  type Column, type ColumnDef, createColumnHelper,
} from "@tanstack/react-table";
import {
  ArrowDown, ArrowUp, CheckCircle, ChevronsUpDown, EyeOff, MinusCircle,
  MoreHorizontal, TriangleAlert,
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
    cell: (info) => info.getValue() ?? "---",
  }),
  columnHelper.accessor("cuisine_description", {
    header: "Cuisine",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor(
    (row) => {
      // Get the most recent inspection
      const inspections = row.inspections;
      if (!inspections || inspections.length === 0) return null;
      return inspections[0].inspection_date;
    },
    {
      id: "inspection_date",
      header: ({ column }) => <SortingButton column={column} label="Date" />,
      cell: (info) => {
        const date = info.getValue();
        return date
          ? new Date(date).toLocaleDateString("en-US", {
              year: "2-digit",
              day: "numeric",
              month: "numeric",
            })
          : "N/A";
      },
      // sortingFn: "datetime", // Add a sorting function, if you want to sort by this date
    }
  ),
  columnHelper.accessor(
    (row) => {
      // Get the most recent inspection
      const inspections = row.inspections;
      if (!inspections || inspections.length === 0) return null;
      return inspections[0].grade;
    },
    {
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
              <span className="cursor-help">{grade || "-"}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{grade ? gradeDescriptions[grade] : "Unknown Grade"}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    }
  ),
  columnHelper.accessor(
    (row) => {
      // Get the most recent inspection
      const inspections = row.inspections;
      if (!inspections || inspections.length === 0) return null;
      return inspections[0].critical_flag;
    },
    {
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
    }
  ),
  columnHelper.accessor(
    (row) => {
      // Get the most recent inspection and its first violation
      const inspections = row.inspections;
      if (!inspections || inspections.length === 0) return null;
      const violations = inspections[0].violations;
      if (!violations || violations.length === 0) return null;
      return violations[0].violation_description;
    },
    {
      id: "violation_description",
      header: "Description",
      cell: (info) => {
        const desc = info.getValue();
        return desc ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help dotted whitespace-nowrap">
                {desc.slice(0, 50)}...
              </span>
            </TooltipTrigger>
            <TooltipContent className="text-balance max-w-sm text-center">
              {desc}
              {/* <p className="text-balance">{desc}</p> */}
            </TooltipContent>
          </Tooltip>
        ) : (
          "Description not provided"
        );
      },
    }
  ),
  columnHelper.display({
    id: "actions",
    cell: (props) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Inspections</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {props.row.original.inspections.map((inspection) => (
                    <DropdownMenuItem key={inspection.inspectionId} asChild>
                      <Link
                        to="/restaurants/$camis/inspections/$inspectionId"
                        params={{
                          camis: props.row.original.camis,
                          inspectionId: inspection.inspectionId,
                        }}
                      >
                        {new Date(
                          inspection.inspection_date
                        ).toLocaleDateString()}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/restaurants/$camis"
                params={{ camis: props.row.original.camis }}
              >
                Restaurant Listing
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
