import { Button } from "@/components/ui/button";

export default function TestShadCN() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Testing ShadCN Components</h1>
      <Button variant="default" className="mb-4">
        Default Button
      </Button>
      <Button variant="outline">Outline Button</Button>
    </div>
  );
}
