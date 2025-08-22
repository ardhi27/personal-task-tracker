import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import InputForm from "../../components/Input";
import Stack from "../../components/Stack";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const InputPage = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const {
    register,
    handleSubmit,
    watch,
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
              <InputForm
                defaultValue="0"
                className="w-full h-[2rem] p-3"
                {...register("priority", { required: true })}
              />
              <span className="text-lg">Deadline</span>
              <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      className="w-full bg-black text-white justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
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
