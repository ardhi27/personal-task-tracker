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
  task: string;
  priority: string;
  deadline: string;
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
    console.log(priority);
    console.log("Tanggal: ", date);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  return (
    <div className="w-screen h-screen bg-black text-white">
      <div className="w-full flex justify-center h-full items-center">
        <div className="w-1/2 h-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack className="bg-white/50 p-5 rounded-md text-black gap-3">
              <span className="text-lg">Task Name</span>
              <InputForm
                defaultValue="test"
                className="w-full h-[2rem] p-3"
                {...register("task", { required: true })}
              />
              <span className="text-lg">Priority</span>
              <Controller
                control={control}
                name="priority"
                defaultValue="Low"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full  data-[placeholder]:text-white  ">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priority.map((prior) => (
                        <SelectItem
                          key={prior.priorityId}
                          value={prior.priority}
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
                  name="deadline"
                  defaultValue={new Date().toLocaleDateString()}
                  render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          className="w-full bg-black text-white justify-between font-normal"
                        >
                          {date
                            ? date.toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })
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
