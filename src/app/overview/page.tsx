import { redirect } from "next/navigation";
import { getAllOverviews } from "@/lib/content";

export default function OverviewIndexPage() {
  const overviews = getAllOverviews();
  if (overviews.length > 0) {
    redirect(`/overview/${overviews[0].slug}`);
  }
  redirect("/");
}
