import Link from "next/link";
import {
  Wrench,
  Zap,
  Paintbrush,
  Lock,
  Hammer,
  PaintBucket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "Plumber",
    icon: Wrench,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    name: "Electrician",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
  },
  {
    name: "Carpenter",
    icon: Hammer,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    name: "Painter",
    icon: Paintbrush,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    name: "Mason",
    icon: PaintBucket,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    name: "Locksmith",
    icon: Lock,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.name}
            href={`/category/${category.name.toLowerCase()}`}
          >
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${category.bgColor} ${category.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Find local {category.name.toLowerCase()}s
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}