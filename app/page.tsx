import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  return (
    <div>
      <Button>CLICK ME!</Button>
      <Button>CLICK ME!</Button>
      <Calendar />
      <p className="text-red-500 font-semibold">Amar</p>
    </div>
  );
}
