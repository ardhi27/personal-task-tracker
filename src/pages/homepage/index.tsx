import Stack from "@/components/Stack";
import Group from "@/components/Group";
import Box from "@/components/BoxTask";
import axios from "axios";
import { useEffect, useState } from "react";

// "taskId": 10,
//             "taskName": "Baca Buku Atomic Habit",
//             "createdAt": "2025-08-24T00:00:00.000Z",
//             "deadlineAt": "2025-08-12T00:00:00.000Z",
//             "priorityId": 2,
//             "priority": {
//                 "priorityId": 2,
//                 "priority": "Medium"
//             }
//         },
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
          <Box className="bg-green-500">
            {taskData.highPriorityData.map((data: TaskData) => (
              <Group key={data.taskId}>
                <span>{data.taskName}</span>
                <span>DELETE</span>
              </Group>
            ))}
          </Box>
          <Box className="bg-yellow-500">a</Box>
          <Box className="bg-red-500">a</Box>
        </Group>
      </div>
    </Stack>
  );
};

export default HomePage;
