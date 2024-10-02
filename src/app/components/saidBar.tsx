import { Listbox, ListboxItem, Button } from "@nextui-org/react";
import { IconWrapper } from "../components/IconWrapper";
import { ItemCounter } from "../components/ItemCounter";
// import { BugIcon } from "./BugIcon";
// import { PullRequestIcon } from "./PullRequestIcon";
import { ChatIcon } from "./ChatIcon";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Rocket from "./rocket";
// import { PlayCircleIcon } from "./PlayCircleIcon";
// import { LayoutIcon } from "./LayoutIcon";
// import { TagIcon } from "./TagIcon";
// import { UsersIcon } from "./UsersIcon";
// import { WatchersIcon } from "./WatchersIcon";
// import { BookIcon } from "./BookIcon";

export default function SaidBar() {
  return (
    <div className="relative w-1/6">
      <Listbox
        aria-label="User Menu"
        onAction={(key) => alert(key)}
        className="p-0 fixed invisible lg:visible gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 h-screen w-1/6   overflow-visible rounded-medium "
        itemClasses={{
          base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        <ListboxItem
          key="Home"
          endContent={<ItemCounter number={13} />}
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <ChatIcon className="text-lg " />
            </IconWrapper>
          }
        >
          Home
        </ListboxItem>
        <ListboxItem
          key="Projects"
          endContent={<ItemCounter number={6} />}
          startContent={
            <IconWrapper className="bg-primary/10 text-primary">
              <ChatIcon className="text-lg " />
            </IconWrapper>
          }
        >
          Projects
        </ListboxItem>
        <ListboxItem
          key="Tasks"
          endContent={<ItemCounter number={293} />}
          startContent={
            <IconWrapper className="bg-secondary/10 text-secondary">
              <ChatIcon className="text-lg " />
            </IconWrapper>
          }
        >
          Tasks
        </ListboxItem>
        <ListboxItem
          key="Team"
          endContent={<ItemCounter number={2} />}
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <ChatIcon className="text-lg " />
            </IconWrapper>
          }
        >
          Team
        </ListboxItem>
        <ListboxItem
          key="Tracker"
          endContent={<ItemCounter number={4} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <ChatIcon className="text-lg " />
            </IconWrapper>
          }
        >
          Tracker
        </ListboxItem>
        <ListboxItem
          key="Analytics"
          endContent={<ItemCounter number={79} />}
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <ChatIcon />
            </IconWrapper>
          }
        >
          Analytics
        </ListboxItem>
        <ListboxItem
          key="Perks"
          endContent={<ItemCounter number={82} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <ChatIcon />
            </IconWrapper>
          }
        >
          Perks
        </ListboxItem>
        <ListboxItem
          key="Expenses"
          endContent={<ItemCounter number={82} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <ChatIcon />
            </IconWrapper>
          }
        >
          Expenses
        </ListboxItem>
        <ListboxItem
          key="Settings"
          endContent={<ItemCounter number={82} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <ChatIcon />
            </IconWrapper>
          }
        >
          Settings
        </ListboxItem>
      </Listbox>

      <Card className="fixed w-1/6 bottom-1/4 invisible lg:visible p-3 overflow-visible h-32">
        <div className="flex justify-center flex-col text-center">
          <div className="flex justify-center gap-3">
            <p>Upgrade to Pro</p>
            <div className="w-6 h-6">
              <Rocket></Rocket>
            </div>
          </div>
          <div className="pt-2">
            <p className="break-words whitespace-normal text-sm text-default-400">
              Get 1 mounth free and unlock all the feautures of the pro plan
            </p>
          </div>
        </div>
        <Button color="primary" className="absolute w-1/2 left-1/4 top-[85%]">
          Upgrade
        </Button>
      </Card>
    </div>
  );
}
