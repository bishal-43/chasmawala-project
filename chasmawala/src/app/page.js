// app/page.js (NO "use client")
import HomePage from "./HomePage";

async function getTrending() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?trending=true`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

async function getBestsellers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?bestseller=true`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function Home() {
  const [trending, bestsellers] = await Promise.all([
    getTrending(),
    getBestsellers(),
  ]);

  return (
    <HomePage
      trending={trending.products}
      bestsellers={bestsellers.products}
    />
  );
}