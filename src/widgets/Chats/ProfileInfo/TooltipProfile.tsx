import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Pencil, LogOut } from "lucide-react";
import { LOGOUT_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store/store";

interface ITooltipProfile {
  text: string;
  iconCode: number;
}

export default function TooltipProfile({ text, iconCode }: ITooltipProfile) {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUserInfo(undefined);
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                onClick={logout}
                className="cursor-pointer text-red-500"
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
