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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-[2rem] h-[2rem]" variant="destructive">
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
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Group>
            ))}
          </Box>
          <Box className="bg-yellow-500 p-3">
            {taskData.mediumPriorityData.map((data: TaskData) => (
              <Group key={data.taskId} className="justify-between">
                <span>{data.taskName}</span>
                <span>DELETE</span>
              </Group>
            ))}
          </Box>
          <Box className="bg-red-500 p-3">
            {taskData.highPriorityData.map((data: TaskData) => (
              <Group key={data.taskId} className="justify-between">
                <span>{data.taskName}</span>
                <span>DELETE</span>
              </Group>
            ))}
          </Box>
        </Group>
      </div>
    </Stack>
  );
};

export default HomePage;
