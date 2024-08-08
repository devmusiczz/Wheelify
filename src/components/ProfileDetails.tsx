// src/components/ProfileDetails.tsx
"use client";

import UpdateButton from "@/components/UpdateButton";
import { updateUser } from "@/lib/action";

import React from 'react';

interface ProfileDetailsProps {
  user: any; 
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-2xl">Profile</h1>
      <form action={updateUser} className="mt-12 flex flex-col gap-4">
        <input type="text" hidden name="id" value={user.member.contactId} />
        <label className="text-sm text-gray-100">Username</label>
        <input
          type="text"
          name="username"
          defaultValue={user.member?.profile?.nickname || "john"}
          className="ring-1 bg-zinc-800 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-zinc-100">First Name</label>
        <input
          type="text"
          name="firstName"
          defaultValue={user.member?.contact?.firstName || "John"}
          className="ring-1 bg-zinc-800 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-gray-100">Surname</label>
        <input
          type="text"
          name="lastName"
          defaultValue={user.member?.contact?.lastName || "Doe"}
          className="ring-1 bg-zinc-800 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-gray-100">Phone</label>
        <input
          type="text"
          name="phone"
          defaultValue={
            (user.member?.contact?.phones && user.member?.contact?.phones[0]) ||
            "+1234567"
          }
          className="ring-1 bg-zinc-800 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-gray-100">E-mail</label>
        <input
          type="email"
          name="email"
          defaultValue={user.member?.loginEmail || "john@gmail.com"}
          className="ring-1 bg-zinc-800 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <UpdateButton />
      </form>
    </div>
  );
};

export default ProfileDetails;
