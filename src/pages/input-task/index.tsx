import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import InputForm from "../../components/Input";
import { useState, useEffect } from "react";
import Stack from "../../components/Stack";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum PriorityEnum {
  high = "high",
  medium = "medium",
  low = "low",
}

type Input = {
  taskName: string;
  priorityId: number;
  deadlineAt: string;
};

interface PriorityProps {
  priorityId: number;
  priority: string;
}
const InputPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<PriorityProps[]>([]);

  const fetchPriorityData = async () => {
    const response = await axios.get("http://localhost:3000/api/priority");
    const data = response.data;
    setPriority(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPriorityData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/task/createtask",
        data
      );
      console.log("Success Input Data : ", response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("API Error : ", error.response?.data);
      } else {
        console.error("Unexpected Error : ", error);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white">
      <div className="w-full flex justify-center h-full items-center">
        <div className="w-1/2 h-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack className="bg-white/50 p-5 rounded-md text-black gap-3">
              <span className="text-lg">Task Name</span>
              <InputForm
                className="w-full h-[2rem] p-3"
                {...register("taskName", {
                  required: true,
                })}
              />
              <span className="text-lg">Priority</span>

              <Controller
                control={control}
                name="priorityId"
                defaultValue={priority[0]?.priorityId}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
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

              <span className="text-lg">Deadline</span>
              <div className="flex flex-col gap-3">
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
                            ? new Date(field.value).toLocaleDateString(
                                "en-US",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : new Date().toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
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

                <div className="w-full flex justify-center">
                  <Button className="bg-black w-48" type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
