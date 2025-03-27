/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { getCookie } from "@/global/getCookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProfilePhoto = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<any>(null);
  const router = useRouter();

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    multiple: false,
  });

  const handleSave = async () => {
    setLoading(true);
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      const token = await getCookie("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/upload-image`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload image");
      }

      setPreview(null);
      setFile(null);
      router.refresh();
      setOpen(false);
      toast.success("uploaded sucessfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pen className="w-4 h-4 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] ">
          <DialogHeader>
            <DialogTitle>Edit Profile Photo</DialogTitle>
          </DialogHeader>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer"
          >
            <input {...getInputProps()} />
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                className="w-full h-full rounded-lg "
                width={500}
                height={500}
              />
            ) : (
              <p className="text-center text-gray-500">
                Drop an image or click to upload
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              {loading ? "Uploading..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePhoto;
