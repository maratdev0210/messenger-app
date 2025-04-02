import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Pencil, LogOut } from "lucide-react";

interface ITooltipProfile {
  text: string;
  iconCode: number;
}

export default function TooltipProfile({ text, iconCode }: ITooltipProfile) {
  const navigate = useNavigate();
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {iconCode == 0 ? (
              <Pencil
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-blue-500"
              />
            ) : (
              <LogOut
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-blue-500"
              />
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white">
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
