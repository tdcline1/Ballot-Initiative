import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useUploadFile } from "@/hooks/useUploadFile";
import { CloudUpload } from "lucide-react";

function FileInput({ ...props }: React.ComponentProps<"input">) {
  const [file, setFile] = React.useState<File>();
  const [uploadClicked, setUploadClicked] = React.useState(false);

  const mutation = useUploadFile();

  const { id, accept } = props;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    if (!id) return;
    mutation.mutate({ file, filetype: id });
    setUploadClicked(true);
  };

  return (
    <div className="rounded p-5">
      <div className="items-center justify-center w-full mb-2">
        <label
          htmlFor={id}
          className="flex  justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center">
            <CloudUpload />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {accept} files only
            </p>
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            multiple
          />
        </label>
      </div>

      {!uploadClicked && (
        <Button
          className="mb-2"
          onClick={handleUpload}
          disabled={mutation.isPending || !file}
        >
          Upload file
        </Button>
      )}

      {uploadClicked && (
        <div className="text-center">
          {mutation.isPending ? (
            <div className="rounded bg-yellow-400/50 p-2">Uploading...</div>
          ) : (
            <div className="rounded bg-green-600/80 p-2">
              {mutation.isSuccess && file !== undefined ? (
                <>✅ {file.name} loaded successfully!</>
              ) : (
                <div className="rounded bg-red-600/80">Error Uploading</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { FileInput };
