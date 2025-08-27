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
import { Pen, Trash } from "lucide-react";
import Input from "@/components/Input";
import { Label } from "@/components/ui/label";

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
type TaskState = {
  highPriorityData: TaskData[];
  mediumPriorityData: TaskData[];
  lowPriorityData: TaskData[];
};
const HomePage = () => {
  const [taskData, setData] = useState<TaskState>({
    highPriorityData: [],
    lowPriorityData: [],
    mediumPriorityData: [],
  });

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
  }, []);

  return (
    <Stack className="w-screen h-screen bg-black">
      <div className="w-full h-full flex justify-center items-center">
        <Group className="gap-x-10">
          <Box className="bg-green-500 p-3">
            {taskData.lowPriorityData.map((data: TaskData) => (
              <Group key={data.taskId} className="justify-between items-center">
                <span>{data.taskName}</span>
                <Group className="gap-x-2">
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          className="bg-blue-500 w-[2rem] h-[2rem]"
                        >
                          <Pen size={32} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input
                              id="name-1"
                              name="name"
                              defaultValue="Pedro Duarte"
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input
                              id="username-1"
                              name="username"
                              defaultValue="@peduarte"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
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
          </Box>
          <Box className="bg-yellow-500 p-3">
            <Stack className="gap-y-3">
              {taskData.mediumPriorityData.map((data: TaskData) => (
                <Group key={data.taskId} className="justify-between">
                  <span>{data.taskName}</span>
                  <Group className="gap-x-2">
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            className="bg-blue-500 w-[2rem] h-[2rem]"
                          >
                            <Pen size={32} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">Name</Label>
                              <Input
                                id="name-1"
                                name="name"
                                defaultValue="Pedro Duarte"
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Username</Label>
                              <Input
                                id="username-1"
                                name="username"
                                defaultValue="@peduarte"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </form>
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
                      <form>
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            className="bg-blue-500 w-[2rem] h-[2rem]"
                          >
                            <Pen size={32} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">Name</Label>
                              <Input
                                id="name-1"
                                name="name"
                                defaultValue="Pedro Duarte"
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Username</Label>
                              <Input
                                id="username-1"
                                name="username"
                                defaultValue="@peduarte"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </form>
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
