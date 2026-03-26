export async function GET() {
  const key = process.env.UNSPLASH_API_KEY;

  if (!key) {
    return Response.json(
      { message: "UNSPLASH_API_KEY is not configured." },
      { status: 500 },
    );
  }

  try {
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${key}`,
    );

    if (!unsplashResponse.ok) {
      return Response.json(
        { message: "Failed to load image from Unsplash." },
        { status: unsplashResponse.status },
      );
    }

    const data = await unsplashResponse.json();

    return Response.json({ imageUrl: data.urls.regular });
  } catch (error) {
    console.error("이미지를 불러오는 중 오류 발생:", error);

    return Response.json(
      { message: "Unexpected error while loading image." },
      { status: 500 },
    );
  }
}
