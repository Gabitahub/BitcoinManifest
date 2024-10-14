"use client";
import PresenceAnimation from "@/frontend/components/ui/Animations/PresenceAnimation";
import TypingAnimation from "@/frontend/components/ui/Animations/TypingAnimation";
import { useToast } from "@/frontend/components/ui/use-toast";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function HomeHero({
  head,
  prehead,
  invalidInviteTitle,
  invalidInviteDescription,
}: {
  head: string | string[];
  prehead: string;
  invalidInviteTitle: string;
  invalidInviteDescription: string;
}) {
  const [index, setIndex] = useState(0);
  const { toast } = useToast();
  const { user } = useUser();
  const dbUser: any = user?.dbUser;

  const wordage = {
    prehead: prehead,
    head: Array.isArray(head) ? head[index] : head,
  };

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => {
        return prev === 16 ? 0 : prev + 1;
      });
    }, 4000);
    return () => {
      clearInterval(i);
    };
  }, []);

  useEffect(() => {
    debugger;
    if (user && !dbUser) {
      toast({
        variant: "destructive",
        title: invalidInviteTitle,
        description: invalidInviteDescription,
      });
    }
  }, [user, dbUser, invalidInviteTitle, invalidInviteDescription, toast]);
  return (
    <section>
      <PresenceAnimation className="font-syncopate max-md:text-center" el="h1">
        {wordage.prehead}
      </PresenceAnimation>
      <TypingAnimation
        el="h1"
        text={wordage.head}
        once
        className="w-full break-words min-h-[100px] max-md:text-center text-[40px] md:text-[60px] lg:text-[80px] xl:text-[3vw] 2xl:text-[3vw] font-syncopate font-bold uppercase leading-none mb-[56px] whitespace-pre-line"
      />
    </section>
  );
}
