/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Building2, Camera, Mail, Phone, Shield, User2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSettingsProps } from "../../../..";
import { Textarea } from "@/components/ui/textarea";
import { Gender } from "@/global/constent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum([Gender.MALE, Gender.FEMALE]),
});

export default function SettingProfile(user: UserSettingsProps) {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      address: user.address,
      phone: user.phone,
      gender: user.gender as Gender,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.image} alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="picture"
                    className="absolute bottom-0 right-0 p-2 backdrop-blur-3xl border rounded-full cursor-pointer hover:shadow-md transition-all"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                  <input
                    type="file"
                    id="picture"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <User2 className="w-4 h-4 mr-2" /> Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Phone className="w-4 h-4 mr-2" /> Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <User2 className="w-4 h-4 mr-2" /> Address
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Phone className="w-4 h-4 mr-2" /> Gender
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                            <SelectItem value={Gender.FEMALE}>
                              Female
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>
                    <Mail className="w-4 h-4 mr-2" /> Email
                  </FormLabel>
                  <Input value={user.email} disabled />
                </FormItem>

                <FormItem>
                  <FormLabel>
                    <Building2 className="w-4 h-4 mr-2" /> Department
                  </FormLabel>
                  <Input value={user.department} disabled />
                </FormItem>

                <FormItem>
                  <FormLabel>
                    <Shield className="w-4 h-4 mr-2" /> User Role
                  </FormLabel>
                  <Input value={user.role?.name} disabled />
                </FormItem>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="w-full sm:w-auto">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
