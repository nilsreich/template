import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Mathe from "../components/mathe";
import { useFishStore } from "../store/store";
import * as Tabs from "@radix-ui/react-tabs";
import { PrismaClient } from "@prisma/client";

const Home: NextPage = ({ posts }) => {
  const bears = useFishStore((state) => state.fishes);
  const increasePopulation = useFishStore((state) => state.addAFish);
  const decreasePopulation = useFishStore((state) => state.removeFish);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(bears);
  }, [bears]);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Tabs.Root defaultValue="tab1" orientation="vertical">
        <Tabs.List aria-label="tabs example">
          <Tabs.Trigger
            value="tab1"
            className="border-b p-2 radix-state-active:bg-blue-300"
          >
            One
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" className="border-b p-2">
            Two
          </Tabs.Trigger>
          <Tabs.Trigger value="tab3" className="border-b p-2">
            Three
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Tab one content</Tabs.Content>
        <Tabs.Content value="tab2">Tab two content</Tabs.Content>
        <Tabs.Content value="tab3">Tab three content</Tabs.Content>
      </Tabs.Root>
      <h1 className="text-3xl font-bold underline">Hello {value}</h1>
      <button onClick={() => increasePopulation(3)}>one up</button>
      <button onClick={() => decreasePopulation(3)}>one down</button>
      {value > 30 ? <Mathe /> : <></>}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });
  const posts = await prisma.post.findMany();

  console.log(user);
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
