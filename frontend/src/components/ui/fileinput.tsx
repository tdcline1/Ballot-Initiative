import * as React from "react";

import { cn } from "@/lib/utils";

function FileInput({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  const [selectedFile, setSelectedFile] = React.useState("No file chosen");

  const { id, ...rest } = props;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0].name);
    } else {
      setSelectedFile("No file chosen");
    }
  };

  return (
    <>
      <input
        type="file"
        data-slot="input"
        className={cn(className)}
        onChange={handleFileChange}
        {...props}
      />
    </>
  );
}

export { FileInput };
