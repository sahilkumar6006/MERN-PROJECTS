import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRefDimensions } from "@/hooks/useRefDimensions";
import { Asterisk, Heart } from "lucide-react";
import { useRef, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProfileCard from "../profile/ProfileCard";

type TeamMember = {
  name: string;
  nick_name: string;
  birthday: string;
  faves: string[];
  gift: {
    title: string;
    image: string;
  };
};

const defaultData: TeamMember[] = [
  {
    name: "Zaid Schwartz",
    nick_name: "Zee",
    birthday: "12 January",
    faves: ["Cold Brew", "Scone"],
    gift: {
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
  },
  {
    name: "Phoenix Baker",
    nick_name: "",
    birthday: "23 March",
    faves: ["Latte", "Cookies"],
    gift: {
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    },
  },
  {
    name: "Lana Steiner",
    nick_name: "",
    birthday: "17 April",
    faves: ["Sparkling Water", "Acal"],
    gift: {
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    },
  },
];

const columnHelper = createColumnHelper<TeamMember>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: () => "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-xs">
          <Avatar>
            <AvatarImage src="..." />
            <AvatarFallback>
              <img src="/user.png" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium">{row.original.name}</span>
            <span>
              {row.original.nick_name.length ? row.original.nick_name : "-"}
            </span>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.birthday, {
    id: "birthday",
    header: () => "Birthday",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <div className="flex h-6 items-center justify-start rounded-full border border-amber-200 bg-amber-50 px-2 text-xs">
            <Asterisk size="16" className="text-amber-500" />
            <span className="pl-1 text-amber-700">{row.original.birthday}</span>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.faves, {
    id: "faves",
    header: () => "Faves",
    cell: ({ row }) => {
      return (
        <>
          {row.original.faves.map((fave: string) => (
            <div className="flex last:pt-1" key={fave}>
              <div className="flex h-6 items-center justify-start rounded-full border border-pink-200 bg-pink-50 px-2 text-xs text-pink-600">
                <Heart size="14" />
                <span className="pl-1">{fave}</span>
              </div>
            </div>
          ))}
        </>
      );
    },
  }),
  columnHelper.accessor("gift.title", {
    header: () => "Gift",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-xs">
          <Avatar className="border border-slate-100">
            <AvatarImage className="p-1.5" src={row.original.gift.image} />
            <AvatarFallback>
              <img src="/user.png" />
            </AvatarFallback>
          </Avatar>
            <span className="line-clamp-1" style={{ color: '#475467' }}>{row.original.gift.title}</span>
        </div>
      );
    },
  }),
];

export default function DashboardComponent() {
  const ref = useRef<HTMLInputElement>(null);
  const dimension = useRefDimensions(ref);
  const pollsDivWidth = dimension.width - 440;

  const [data, _setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div ref={ref} className="bg-gray-50 p-6">
      <div className="flex items-start gap-6">
        <div className="flex flex-grow flex-col gap-6">
          <div className="absolute z-10 flex items-center gap-2 px-4 py-4 pb-0">
            <div>Polls</div>
            <Badge variant="secondary" className="border border-primary">
              1 active poll
            </Badge>
          </div>
          <ScrollArea
            style={{
              width: `${pollsDivWidth}px`,
            }}
            className="whitespace-nowrap rounded-lg border bg-white"
          >
            <div className="flex w-max space-x-4 p-4 pt-14">
              <Card className="h-40 w-[400px]">
                <CardContent className="h-full p-0">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center gap-2 p-3">
                      <div className="text-wrap font-semibold">
                        Which restaurant do you want to go to for our team
                        dinner?
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200">
                      <div className="pl-2 text-sm text-slate-500">
                        3 days remaining
                      </div>
                      <Button variant="ghost" className="text-primary">
                        Respond
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="h-40 w-[400px]">
                <CardContent className="h-full p-0">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center gap-2 p-3">
                      <div className="font-semibold">
                        What activity for the weekend team event?
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200">
                      <div className="pl-2 text-sm text-slate-500">
                        completed 12/08/24
                      </div>
                      <Button variant="ghost" className="text-primary">
                        View Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="h-40 w-[400px]">
                <CardContent className="h-full p-0">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center gap-2 p-3">
                      <div className="font-semibold">
                        What activity for the weekend team event?
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200">
                      <div className="pl-2 text-sm text-slate-500">
                        completed 12/08/24
                      </div>
                      <Button variant="ghost" className="text-primary">
                        View Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="h-40 w-[400px]">
                <CardContent className="h-full p-0">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center gap-2 p-3">
                      <div className="font-semibold">
                        What activity for the weekend team event?
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200">
                      <div className="pl-2 text-sm text-slate-500">
                        completed 12/08/24
                      </div>
                      <Button variant="ghost" className="text-primary">
                        View Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="h-40 w-[400px]">
                <CardContent className="h-full p-0">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center gap-2 p-3">
                      <div className="font-semibold">
                        What activity for the weekend team event?
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200">
                      <div className="pl-2 text-sm text-slate-500">
                        completed 12/08/24
                      </div>
                      <Button variant="ghost" className="text-primary">
                        View Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center gap-2 p-4">
                <div className="text-lg font-semibold text-primary-900">Team Members</div>
                <Badge variant="secondary" className="border border-primary">
                  team nick_name
                </Badge>
              </div>
              <div>
                <Table>
                  <TableHeader className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            className="font-normal text-slate-600"
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell className="p-3" key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <ProfileCard />
      </div>
    </div>
  );
}
