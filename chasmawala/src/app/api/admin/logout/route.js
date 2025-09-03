export async function POST() {
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": `auth-token=; Path=/; HttpOnly; Max-Age=0`,
    },
  });
}
