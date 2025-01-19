import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="">
      <div className="flex gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="muted">Muted</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="teritary">Teritary</Button>
        <Button disabled>Teritary</Button>
      </div>
      <Input />
      <p className="text-red-500 font-semibold">Amar</p>
    </div>
  );
}
