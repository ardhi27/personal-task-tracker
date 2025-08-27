import Stack from "@/components/Stack";
import Group from "@/components/Group";
import Box from "@/components/BoxTask";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Pen, Trash } from "lucide-react";
import Input from "@/components/Input";
import { Label } from "@/components/ui/label";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
interface TaskData {
  taskName: string;
  createdAt: string;
  deadlineAt: string;
  taskId: number;
  priorityId: number;
  priority: {
    priorityId: number;
    priority: string;
  };
}

type UpdateData = {
  taskName: string;
  priorityId: number;
  deadlineAt: string;
  taskId: number;
};
type TaskState = {
  highPriorityData: TaskData[];
  mediumPriorityData: TaskData[];
  lowPriorityData: TaskData[];
};

type PriorityProps = {
  priorityId: number;
  priority: string;
};
const HomePage = () => {
  const [taskData, setData] = useState<TaskState>({
    highPriorityData: [],
    lowPriorityData: [],
    mediumPriorityData: [],
  });
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<PriorityProps[]>([]);
  const [taskId, setTaskId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateData>();

  const onSubmit: SubmitHandler<UpdateData> = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/${taskId}`,
        data
      );
      console.log("Success Update Data : ", response.data);
      window.location.reload();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("API Error : ", error.response?.data);
      } else {
        console.error("Unexpected Error : ", error);
      }
    }
  };

  const fetchPriorityData = async () => {
    const response = await axios.get("http://localhost:3000/api/priority");
    const data = response.data;
    setPriority(data);
    console.log(data);
  };

  const deleteData = async (id: Number) => {
    const response = await axios.delete(`http://localhost:3000/api/task/${id}`);
    const data = await response.data;
    console.log(data);
    window.location.reload();
  };

  const fetchHighPriorityData = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/task/highpriority"
    );
    if (!response.data) {
      console.log("No Data Found");
    } else {
      setData((prev) => ({
        ...prev,
        highPriorityData: [...prev.highPriorityData, ...response.data.data],
      }));
      console.log("Data For High Priority Task: ", response.data.data);
    }
  };

  const fetchLowPriorityData = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/task/lowpriority"
    );
    if (!response.data) {
      console.log("No Data Found");
    } else {
      setData((prev) => ({
        ...prev,
        lowPriorityData: [...prev.lowPriorityData, ...response.data.data],
      }));
      console.log("Data For Low Priority Task: ", response.data.data);
    }
  };

  const fetchMediumPriorityData = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/task/mediumPriority"
    );
    if (!response.data) {
      console.log("No Data Found");
    } else {
      setData((prev) => ({
        ...prev,
        mediumPriorityData: [...prev.mediumPriorityData, ...response.data.data],
      }));
      console.log("Data For Medium Priority Task: ", response.data.data);
    }
  };

  useEffect(() => {
    fetchHighPriorityData();
    fetchLowPriorityData();
    fetchMediumPriorityData();
    fetchPriorityData();
  }, []);

  return (
    <Stack className="w-screen h-screen bg-black">
      <div className="w-full h-full flex justify-center items-center">
        <Group className="gap-x-10">
          <Box className="bg-green-500 p-3">
            <Stack className="gap-y-3">
              {taskData.lowPriorityData.map((data: TaskData) => (
                <Group
                  key={data.taskId}
                  className="justify-between items-center"
                >
                  <span>{data.taskName}</span>
                  <Group className="gap-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          className="bg-blue-500 w-[2rem] h-[2rem]"
                        >
                          <Pen size={32} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Input
                            type="hidden"
                            defaultValue={data.taskId}
                            {...register("taskId")}
                          />
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">Task Name</Label>
                              <Input
                                id="name-1"
                                defaultValue="Input Your Task"
                                {...register("taskName", {
                                  required: true,
                                })}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Priority</Label>
                              <Controller
                                control={control}
                                name="priorityId"
                                defaultValue={priority[0]?.priorityId}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={(val) =>
                                      field.onChange(Number(val))
                                    }
                                    defaultValue={String(field.value)}
                                  >
                                    <SelectTrigger className="w-full  data-[placeholder]:text-white  ">
                                      <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {priority.map((prior) => (
                                        <SelectItem
                                          key={prior.priorityId}
                                          value={String(prior.priorityId)}
                                        >
                                          {prior.priority}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <Label>Deadline</Label>
                            <Controller
                              control={control}
                              name="deadlineAt"
                              defaultValue={new Date().toLocaleDateString()}
                              render={({ field }) => (
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="date"
                                      className="w-full bg-black text-white justify-between font-normal"
                                    >
                                      {field.value
                                        ? new Date(
                                            field.value
                                          ).toLocaleDateString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          })
                                        : new Date().toLocaleDateString(
                                            "en-US",
                                            {
                                              month: "2-digit",
                                              day: "2-digit",
                                              year: "numeric",
                                            }
                                          )}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={date}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setDate(date);
                                        field.onChange(
                                          date?.toLocaleString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          })
                                        );
                                        setOpen(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              onClick={() => setTaskId(data.taskId)}
                              type="submit"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-[2rem] h-[2rem]"
                          variant="destructive"
                        >
                          <Trash size={32} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your task data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteData(data.taskId)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Box>
          <Box className="bg-yellow-500 p-3">
            <Stack className="gap-y-3">
              {taskData.mediumPriorityData.map((data: TaskData) => (
                <Group key={data.taskId} className="justify-between">
                  <span>{data.taskName}</span>
                  <Group className="gap-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          className="bg-blue-500 w-[2rem] h-[2rem]"
                        >
                          <Pen size={32} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Input
                            type="hidden"
                            defaultValue={data.taskId}
                            {...register("taskId")}
                          />
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">Task Name</Label>
                              <Input
                                id="name-1"
                                defaultValue="Input Your Task"
                                {...register("taskName", {
                                  required: true,
                                })}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Priority</Label>
                              <Controller
                                control={control}
                                name="priorityId"
                                defaultValue={priority[0]?.priorityId}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={(val) =>
                                      field.onChange(Number(val))
                                    }
                                    defaultValue={String(field.value)}
                                  >
                                    <SelectTrigger className="w-full  data-[placeholder]:text-white  ">
                                      <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {priority.map((prior) => (
                                        <SelectItem
                                          key={prior.priorityId}
                                          value={String(prior.priorityId)}
                                        >
                                          {prior.priority}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <Label>Deadline</Label>
                            <Controller
                              control={control}
                              name="deadlineAt"
                              defaultValue={new Date().toLocaleDateString()}
                              render={({ field }) => (
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="date"
                                      className="w-full bg-black text-white justify-between font-normal"
                                    >
                                      {field.value
                                        ? new Date(
                                            field.value
                                          ).toLocaleDateString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          })
                                        : new Date().toLocaleDateString(
                                            "en-US",
                                            {
                                              month: "2-digit",
                                              day: "2-digit",
                                              year: "numeric",
                                            }
                                          )}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={date}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setDate(date);
                                        field.onChange(
                                          date?.toLocaleString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          })
                                        );
                                        setOpen(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              onClick={() => setTaskId(data.taskId)}
                              type="submit"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-[2rem] h-[2rem]"
                          variant="destructive"
                        >
                          <Trash size={32} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your task data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteData(data.taskId)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Box>

          <Box className="bg-red-500 p-3">
            <Stack className="gap-y-4">
              {taskData.highPriorityData.map((data: TaskData) => (
                <Group key={data.taskId} className="justify-between">
                  <span>{data.taskName}</span>
                  <Group className="gap-x-4  items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          className="bg-blue-500 w-[2rem] h-[2rem]"
                        >
                          <Pen size={32} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Input
                            type="hidden"
                            defaultValue={data.taskId}
                            {...register("taskId")}
                          />
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">Task Name</Label>
                              <Input
                                id="name-1"
                                defaultValue="Input Your Task"
                                {...register("taskName", {
                                  required: true,
                                })}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Priority</Label>
                              <Controller
                                control={control}
                                name="priorityId"
                                defaultValue={priority[0]?.priorityId}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={(val) =>
                                      field.onChange(Number(val))
                                    }
                                    defaultValue={String(field.value)}
                                  >
                                    <SelectTrigger className="w-full  data-[placeholder]:text-white  ">
                                      <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {priority.map((prior) => (
                                        <SelectItem
                                          key={prior.priorityId}
                                          value={String(prior.priorityId)}
                                        >
                                          {prior.priority}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <Label>Deadline</Label>
                            <Controller
                              control={control}
                              name="deadlineAt"
                              defaultValue={new Date().toLocaleDateString()}
                              render={({ field }) => (
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="date"
                                      className="w-full bg-black text-white justify-between font-normal"
                                    >
                                      {field.value
                                        ? new Date(
                                            field.value
                                          ).toLocaleDateString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          })
                                        : new Date().toLocaleDateString(
                                            "en-US",
                                            {
                                              month: "2-digit",
                                              day: "2-digit",
                                              year: "numeric",
                                            }
                                          )}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={date}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setDate(date);
                                        field.onChange(
                                          date?.toLocaleString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          })
                                        );
                                        setOpen(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              onClick={() => setTaskId(data.taskId)}
                              type="submit"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-[2rem] h-[2rem]"
                          variant="destructive"
                        >
                          <Trash size={32} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your task data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteData(data.taskId)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Box>
        </Group>
      </div>
    </Stack>
  );
};

export default HomePage;
