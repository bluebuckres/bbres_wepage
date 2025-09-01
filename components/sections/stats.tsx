import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsSection() {
  const stats = [
    { title: "Happy Clients", value: "100+" },
    { title: "Projects Completed", value: "250+" },
    { title: "Years Experience", value: "5+" }
  ];

  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-lg">
                  {stat.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
