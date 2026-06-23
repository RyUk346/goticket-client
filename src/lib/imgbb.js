"use client";

export async function uploadImage(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key || key === "placeholder") {
    throw new Error("Image host key missing. Set a valid NEXT_PUBLIC_IMGBB_KEY in .env.local and restart the dev server.");
  }
  const formData = new FormData();
  formData.append("image", file);

  let data;
  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });
    data = await res.json();
  } catch {
    throw new Error("Could not reach the image host. Check your internet connection.");
  }
  if (!data?.success) {
    throw new Error(data?.error?.message || "Image upload failed. Check your imgbb API key.");
  }
  return data.data.url;
}
