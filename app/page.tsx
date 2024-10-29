"use client"

import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";

export default function Home() {

  const documents = useQuery(api.documents.getDocument);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="flex flex-col gap-8 items-center">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <button onClick={() => {
          createDocument({ title: 'first document' })
        }}>Creaet Document</button>

        {documents?.map( (doc) => (
          <div key={doc._id}> {doc.title} </div>
        ))}
      </Authenticated>
    </main>
  );
}
