import * as TabsPrimitive from "@radix-ui/react-tabs";

// Tabs Component
export const Tabs = TabsPrimitive.Root;

// TabsList Component
export const TabsList = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <TabsPrimitive.List className={`flex space-x-2 ${className}`} {...props} />
);

// TabsTrigger Component
export const TabsTrigger = ({
  className,
  value, // Ensure this value matches the TabsContent value
  ...props
}: React.HTMLProps<HTMLButtonElement> & { value: string }) => (
  <TabsPrimitive.Trigger
    className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    value={value} // Ensure the value is passed here
    {...props}
  />
);

// TabsContent Component
export const TabsContent = ({
  className,
  value, // Ensure this value matches the TabsTrigger value
  ...props
}: React.HTMLProps<HTMLDivElement> & { value: string }) => (
  <TabsPrimitive.Content
    className={`p-4 border-t border-gray-200 ${className}`}
    value={value} // Ensure the value is passed here
    {...props}
  />
);
